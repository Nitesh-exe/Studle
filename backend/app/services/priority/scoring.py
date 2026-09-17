# backend/app/services/priority/scoring.py
"""
Section 12 Priority Engine:
Explainable scoring model based on:
- Exam Urgency (0.35)
- Topic Weakness (0.30)
- Pending Work (0.20)
- Topic Importance (0.15)
"""

PRIORITY_WEIGHTS = {
    "exam_urgency": 0.35,
    "topic_weakness": 0.30,
    "pending_work": 0.20,
    "topic_importance": 0.15,
}

def calculate_exam_urgency(days_left: int) -> float:
    if days_left <= 2:
        return 98.0
    elif days_left <= 5:
        return 90.0
    elif days_left <= 10:
        return 75.0
    elif days_left <= 20:
        return 50.0
    else:
        return 25.0

def calculate_topic_weakness(mastery_score: float) -> float:
    # 0 mastery means 100 weakness; 100 mastery means 0 weakness
    return max(0.0, min(100.0, 100.0 - mastery_score))

def calculate_priority_score(
    exam_urgency: float,
    topic_weakness: float,
    pending_work: float,
    topic_importance: float,
) -> float:
    score = (
        PRIORITY_WEIGHTS["exam_urgency"] * exam_urgency
        + PRIORITY_WEIGHTS["topic_weakness"] * topic_weakness
        + PRIORITY_WEIGHTS["pending_work"] * pending_work
        + PRIORITY_WEIGHTS["topic_importance"] * topic_importance
    )
    return round(score, 2)
