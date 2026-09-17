# backend/app/services/quantum/simulator.py
import cmath
import math
import random
from typing import List, Dict, Any

INV_SQRT2 = 1.0 / math.sqrt(2.0)

class QuantumCircuitSimulator:
    def __init__(self, num_qubits: int = 2):
        self.num_qubits = num_qubits
        self.num_states = 1 << num_qubits
        # Initialize state |0...0> = 1.0 + 0j
        self.state = [0.0 + 0.0j] * self.num_states
        self.state[0] = 1.0 + 0.0j

    def apply_single_gate(self, qubit: int, matrix: List[List[complex]]):
        """Apply a 2x2 matrix to a specific qubit."""
        m00, m01 = matrix[0][0], matrix[0][1]
        m10, m11 = matrix[1][0], matrix[1][1]

        step = 1 << qubit
        new_state = list(self.state)

        for i in range(0, self.num_states, step * 2):
            for j in range(i, i + step):
                idx0 = j
                idx1 = j + step

                v0 = self.state[idx0]
                v1 = self.state[idx1]

                new_state[idx0] = m00 * v0 + m01 * v1
                new_state[idx1] = m10 * v0 + m11 * v1

        self.state = new_state

    def h(self, qubit: int):
        """Hadamard gate"""
        mat = [
            [INV_SQRT2, INV_SQRT2],
            [INV_SQRT2, -INV_SQRT2],
        ]
        self.apply_single_gate(qubit, mat)

    def x(self, qubit: int):
        """Pauli-X NOT gate"""
        mat = [
            [0.0, 1.0],
            [1.0, 0.0],
        ]
        self.apply_single_gate(qubit, mat)

    def y(self, qubit: int):
        """Pauli-Y gate"""
        mat = [
            [0.0, -1.0j],
            [1.0j, 0.0],
        ]
        self.apply_single_gate(qubit, mat)

    def z(self, qubit: int):
        """Pauli-Z phase-flip gate"""
        mat = [
            [1.0, 0.0],
            [0.0, -1.0],
        ]
        self.apply_single_gate(qubit, mat)

    def cx(self, control: int, target: int):
        """Controlled-NOT gate"""
        new_state = list(self.state)
        ctrl_mask = 1 << control
        tgt_mask = 1 << target

        for i in range(self.num_states):
            if (i & ctrl_mask) != 0:
                # Target bit is flipped
                partner = i ^ tgt_mask
                if partner > i:
                    new_state[i] = self.state[partner]
                    new_state[partner] = self.state[i]

        self.state = new_state

    def get_probabilities(self) -> Dict[str, float]:
        probs = {}
        for i, amp in enumerate(self.state):
            prob = (amp.real ** 2) + (amp.imag ** 2)
            if prob > 0.0001:
                bitstring = bin(i)[2:].zfill(self.num_qubits)
                probs[bitstring] = round(prob, 4)
        return probs

    def sample_shots(self, shots: int = 1024) -> Dict[str, int]:
        all_probs = [(amp.real ** 2) + (amp.imag ** 2) for amp in self.state]
        counts = {}
        for _ in range(shots):
            r = random.random()
            cum = 0.0
            chosen_idx = 0
            for idx, p in enumerate(all_probs):
                cum += p
                if r <= cum:
                    chosen_idx = idx
                    break
            bitstring = bin(chosen_idx)[2:].zfill(self.num_qubits)
            counts[bitstring] = counts.get(bitstring, 0) + 1
        return counts

def simulate_circuit(num_qubits: int, gates: List[Dict[str, Any]], shots: int = 1024) -> Dict[str, Any]:
    # Sort gates chronologically by step
    sorted_gates = sorted(gates, key=lambda g: g.get("step", 0))
    sim = QuantumCircuitSimulator(num_qubits)

    for g in sorted_gates:
        gtype = g.get("type", "").upper()
        q = g.get("qubit", 0)
        tgt = g.get("target", (q + 1) % num_qubits)

        if gtype == "H":
            sim.h(q)
        elif gtype == "X":
            sim.x(q)
        elif gtype == "Y":
            sim.y(q)
        elif gtype == "Z":
            sim.z(q)
        elif gtype == "CX":
            sim.cx(q, tgt)
        # 'M' is measurement, captured at readout

    probs = sim.get_probabilities()
    shot_counts = sim.sample_shots(shots)

    statevector_repr = [
        f"({amp.real:+.3f}{amp.imag:+.3f}j)|{bin(i)[2:].zfill(num_qubits)}>"
        for i, amp in enumerate(sim.state)
        if abs(amp) > 0.001
    ]

    return {
        "qubits": num_qubits,
        "probabilities": probs,
        "shots": shot_counts,
        "statevector": statevector_repr,
    }
