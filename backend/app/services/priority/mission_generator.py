# backend/app/services/priority/mission_generator.py
from typing import List, Dict, Any
from .scoring import calculate_exam_urgency, calculate_topic_weakness, calculate_priority_score

def generate_mission_items(
    topics: List[Dict[str, Any]],
    exams: List[Dict[str, Any]],
    tasks: List[Dict[str, Any]],
    max_duration_minutes: int = 120,
) -> List[Dict[str, Any]]:
    # Map subject name to minimum days_left
    exam_map = {}
    for e in exams:
        subj = e.get("subject", "")
        days = e.get("days_left", 30)
        if subj not in exam_map or days < exam_map[subj]:
            exam_map[subj] = days

    # Map subject name to pending task count
    pending_task_map = {}
    for t in tasks:
        if not t.get("completed", False):
            s = t.get("subject_name", "")
            pending_task_map[s] = pending_task_map.get(s, 0) + 1

    scored_candidates = []
    for top in topics:
        if top.get("completed", False):
            continue

        subj = top.get("subject_name", "General")
        days = exam_map.get(subj, 25)
        exam_urgency = calculate_exam_urgency(days)
        weakness = calculate_topic_weakness(top.get("mastery_score", 50.0))
        has_pending = 80.0 if pending_task_map.get(subj, 0) > 0 else 30.0
        importance = top.get("importance", 75.0)

        score = calculate_priority_score(
            exam_urgency=exam_urgency,
            topic_weakness=weakness,
            pending_work=has_pending,
            topic_importance=importance,
        )

        reason = f"Exam in {days} days (Urgency: {int(exam_urgency)}) • Mastery: {int(top.get('mastery_score', 50))}%"
        scored_candidates.append({
            "id": f"m-{top.get('id')}",
            "subject": subj,
            "title": top.get("title", ""),
            "durationMinutes": 45 if score > 80 else 30,
            "reason": reason,
            "priorityScore": score,
            "completed": False,
        })

    # Sort descending by priority score
    scored_candidates.sort(key=lambda x: x["priorityScore"], reverse=True)

    # Accumulate within daily budget
    total_time = 0
    selected = []
    for item in scored_candidates:
        if total_time + item["durationMinutes"] <= max_duration_minutes or len(selected) < 2:
            selected.append(item)
            total_time += item["durationMinutes"]
            if len(selected) >= 4:
                break

    return selected
