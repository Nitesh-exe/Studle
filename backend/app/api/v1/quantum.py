# backend/app/api/v1/quantum.py
from fastapi import APIRouter
from ...services.quantum.simulator import simulate_circuit
from ...services.ai.gemini_client import gemini

router = APIRouter()

@router.post("/simulate")
async def run_quantum_simulation(data: dict):
    qubits = data.get("qubits", 2)
    gates = data.get("gates", [])
    shots = data.get("shots", 1024)

    results = simulate_circuit(num_qubits=qubits, gates=gates, shots=shots)
    return results

@router.post("/explain")
async def explain_quantum_circuit(data: dict):
    gates = data.get("gates", [])
    gate_types = [g.get("type", "") for g in gates]

    prompt = f"""
Explain the physical and mathematical behavior of this quantum circuit containing gates: {gate_types}.
Touch upon superposition, entanglement, and measurement collapse in intuitive student terms.
"""
    explanation = await gemini.generate_content(prompt)

    if "bell" in str(gate_types).lower() or ("H" in gate_types and "CX" in gate_types):
        explanation = (
            "This circuit synthesizes an entangled Bell State (|Φ⁺⟩ = (|00⟩ + |11⟩)/√2). "
            "First, the Hadamard gate (H) creates an equal superposition of |0⟩ and |1⟩ on the control qubit. "
            "Next, the CNOT (CX) gate flips the target qubit if and only if the control qubit is |1⟩. "
            "Consequently, measuring one qubit immediately collapses both qubits into identical binary outcomes, "
            "violating classical local realism and illustrating Einstein-Podolsky-Rosen (EPR) quantum correlation."
        )

    return {
        "explanation": explanation,
        "principles": ["Quantum Superposition", "Quantum Entanglement", "Projective Measurement"],
    }
