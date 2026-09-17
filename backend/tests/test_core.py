# backend/tests/test_core.py
"""
Runnable self-check test following the Ponytail principle:
Smallest thing that fails if core logic breaks.
No fixtures, no external test frameworks required.
"""
import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.services.priority.scoring import calculate_priority_score, calculate_exam_urgency, calculate_topic_weakness
from app.services.priority.mission_generator import generate_mission_items
from app.services.quantum.simulator import QuantumCircuitSimulator, simulate_circuit

def test_priority_scoring():
    urgency = 90.0
    weakness = 80.0
    pending = 50.0
    importance = 85.0

    score = calculate_priority_score(urgency, weakness, pending, importance)
    expected = 0.35 * 90 + 0.30 * 80 + 0.20 * 50 + 0.15 * 85 # 78.25
    assert abs(score - expected) < 0.01, f"Expected {expected}, got {score}"

    assert calculate_exam_urgency(2) == 98.0
    assert calculate_topic_weakness(30.0) == 70.0
    print("✓ Priority scoring calculation passed.")

def test_quantum_bell_state_simulation():
    # 2-qubit Bell State: H on q0, CX from q0 to q1
    sim = QuantumCircuitSimulator(num_qubits=2)
    sim.h(0)
    sim.cx(0, 1)

    probs = sim.get_probabilities()
    assert "00" in probs, "State |00> must exist"
    assert "11" in probs, "State |11> must exist"
    assert abs(probs["00"] - 0.5) < 0.01, f"Expected ~0.5 for |00>, got {probs['00']}"
    assert abs(probs["11"] - 0.5) < 0.01, f"Expected ~0.5 for |11>, got {probs['11']}"
    assert "01" not in probs, "State |01> must have 0 probability in Bell state"
    assert "10" not in probs, "State |10> must have 0 probability in Bell state"

    res = simulate_circuit(num_qubits=2, gates=[
        {"type": "H", "qubit": 0, "step": 0},
        {"type": "CX", "qubit": 0, "target": 1, "step": 1},
    ], shots=500)
    assert res["shots"]["00"] + res["shots"]["11"] == 500
    print("✓ Quantum state-vector Bell state simulation passed.")

def test_mission_generator():
    topics = [
        {"id": "1", "subject_name": "DBMS", "title": "B+ Tree Indexing", "mastery_score": 30, "importance": 90, "completed": False},
        {"id": "2", "subject_name": "DAA", "title": "Dynamic Programming", "mastery_score": 20, "importance": 95, "completed": False},
        {"id": "3", "subject_name": "OS", "title": "Already Done", "mastery_score": 90, "importance": 50, "completed": True},
    ]
    exams = [{"subject": "DBMS", "days_left": 4}]
    tasks = [{"subject_name": "DBMS", "completed": False}]

    items = generate_mission_items(topics, exams, tasks, max_duration_minutes=90)
    assert len(items) >= 1
    # Check sorted descending by score
    scores = [item["priorityScore"] for item in items]
    assert scores == sorted(scores, reverse=True), "Mission items must be sorted by priority score"
    print("✓ Mission generator test passed.")

if __name__ == "__main__":
    test_priority_scoring()
    test_quantum_bell_state_simulation()
    test_mission_generator()
    print("\nALL STUDLE CORE LOGIC CHECKS PASSED SUCCESSFULLY! 🎯")
