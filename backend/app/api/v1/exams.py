# backend/app/api/v1/exams.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ...db.session import get_db
from ...db.models import Exam

router = APIRouter()

@router.get("")
async def get_exams(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Exam))
    exams = res.scalars().all()
    return [
        {
            "id": e.id,
            "title": e.title,
            "subject": e.subject,
            "date": e.date,
            "daysLeft": e.days_left,
            "progress": e.progress,
            "color": e.color,
            "topics": e.topics,
        }
        for e in exams
    ]

@router.post("")
async def create_exam(data: dict, db: AsyncSession = Depends(get_db)):
    exam = Exam(
        title=data.get("title", "Exam"),
        subject=data.get("subject", "General"),
        date=data.get("date", ""),
        days_left=data.get("daysLeft", 7),
        progress=data.get("progress", 20),
        color=data.get("color", "#6366f1"),
        topics=data.get("topics", ""),
    )
    db.add(exam)
    await db.commit()
    await db.refresh(exam)
    return {
        "id": exam.id,
        "title": exam.title,
        "subject": exam.subject,
        "date": exam.date,
        "daysLeft": exam.days_left,
    }
