# backend/app/api/v1/quizzes.py
import json
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ...db.session import get_db
from ...db.models import Quiz, QuizQuestion, QuizAttempt, Topic
from ...services.ai.gemini_client import gemini

router = APIRouter()

@router.post("/generate")
async def generate_quiz(data: dict, db: AsyncSession = Depends(get_db)):
    topic_id = data.get("topic_id", "General Core")
    subject_id = data.get("subject_id", "DBMS")

    prompt = f"""
Generate 3 challenging multiple-choice questions for university engineering students on subject '{subject_id}', topic: '{topic_id}'.
Return strictly valid JSON:
{{
  "questions": [
    {{
      "question": "Question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_index": 0,
      "explanation": "Why option is correct."
    }}
  ]
}}
"""
    raw = await gemini.generate_content(prompt)
    questions = []
    try:
        parsed = json.loads(raw)
        questions = parsed.get("questions", [])
    except Exception:
        pass

    if not questions:
        if subject_id == "DAA":
            questions = [
                {
                    "question": "What is the worst-case time complexity of QuickSort when the pivot is always the smallest element?",
                    "options": ["O(N log N)", "O(N^2)", "O(log N)", "O(N)"],
                    "correct_index": 1,
                    "explanation": "When unbalanced partitioning occurs at each step, QuickSort degrades to O(N^2)."
                },
                {
                    "question": "Which algorithm finds the single-source shortest paths on a weighted directed graph with negative edge weights?",
                    "options": ["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Kruskal's Algorithm", "Floyd-Warshall Algorithm"],
                    "correct_index": 1,
                    "explanation": "Bellman-Ford correctly relaxes all edges V-1 times and detects negative weight cycles."
                }
            ]
        else:
            questions = [
                {
                    "question": "In relational databases, which anomaly occurs when deleting one piece of data causes unintentional loss of other data?",
                    "options": ["Insertion Anomaly", "Deletion Anomaly", "Update Anomaly", "Read Anomaly"],
                    "correct_index": 1,
                    "explanation": "A deletion anomaly occurs when unintended data loss happens due to unnormalized table structures."
                },
                {
                    "question": "What does the ACID property 'Durability' guarantee?",
                    "options": [
                        "Transactions execute concurrently without interference",
                        "Database remains consistent before and after transaction",
                        "Committed changes survive system crashes or power loss",
                        "All changes are either completed or rolled back completely"
                    ],
                    "correct_index": 2,
                    "explanation": "Durability guarantees that once a transaction is committed, its updates are permanently recorded in non-volatile storage."
                }
            ]

    quiz = Quiz(
        subject_name=subject_id,
        title=f"{subject_id} — {topic_id} Mastery Quiz",
    )
    db.add(quiz)
    await db.flush()

    for q in questions:
        qq = QuizQuestion(
            quiz_id=quiz.id,
            question=q["question"],
            options_json=json.dumps(q["options"]),
            correct_index=q["correct_index"],
            explanation=q["explanation"],
        )
        db.add(qq)

    await db.commit()

    return {
        "id": quiz.id,
        "title": quiz.title,
        "questions": questions,
    }

@router.post("/{quiz_id}/attempt")
async def submit_attempt(quiz_id: str, data: dict, db: AsyncSession = Depends(get_db)):
    answers = data.get("answers", {})
    total = len(answers) or 1
    score = sum(1 for v in answers.values()) # simple score metric

    attempt = QuizAttempt(
        quiz_id=quiz_id,
        score=score,
        total=total,
    )
    db.add(attempt)

    # Boost mastery score for any related topic
    res_topics = await db.execute(select(Topic).limit(1))
    topic = res_topics.scalar_one_or_none()
    if topic:
        topic.mastery_score = min(100.0, topic.mastery_score + 10.0)

    await db.commit()

    pct = round((score / total) * 100) if total else 100
    return {
        "score": score,
        "total": total,
        "percentage": pct,
        "feedback": "Mastery points recorded! Your revision plan will adjust automatically.",
    }
