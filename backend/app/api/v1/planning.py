# backend/app/api/v1/planning.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from ...db.session import get_db
from ...db.models import Subject, Topic, Task, Exam, StudySession
from ...services.priority.mission_generator import generate_mission_items

router = APIRouter()

async def _build_mission(db: AsyncSession):
    # Fetch all subjects with topics
    res_sub = await db.execute(select(Subject).options(selectinload(Subject.topics)))
    subjects = res_sub.scalars().all()

    flat_topics = []
    for s in subjects:
        for t in s.topics:
            flat_topics.append({
                "id": t.id,
                "subject_name": s.name,
                "title": t.title,
                "mastery_score": t.mastery_score,
                "importance": t.importance,
                "completed": t.completed,
            })

    # Fetch exams
    res_exams = await db.execute(select(Exam))
    exams = [{"subject": e.subject, "days_left": e.days_left} for e in res_exams.scalars().all()]

    # Fetch tasks
    res_tasks = await db.execute(select(Task))
    tasks = [{"subject_name": t.subject_name, "completed": t.completed} for t in res_tasks.scalars().all()]

    items = generate_mission_items(flat_topics, exams, tasks, max_duration_minutes=120)
    return {"items": items}

@router.get("/today")
async def get_today_mission(db: AsyncSession = Depends(get_db)):
    return await _build_mission(db)

@router.post("/generate")
async def regenerate_mission(db: AsyncSession = Depends(get_db)):
    return await _build_mission(db)

@router.post("/sessions")
async def log_session(data: dict, db: AsyncSession = Depends(get_db)):
    session = StudySession(
        subject_name=data.get("subject_name", "Focus Study"),
        duration_minutes=data.get("duration_minutes", 25),
    )
    db.add(session)
    await db.commit()
    return {"status": "logged", "duration": session.duration_minutes}
