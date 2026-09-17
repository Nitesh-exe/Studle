# backend/app/api/v1/profile.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ...db.session import get_db
from ...db.models import User

router = APIRouter()

@router.get("")
async def get_profile(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(User).limit(1))
    user = res.scalar_one_or_none()
    if not user:
        return {
            "name": "Nitesh",
            "email": "nitesh@example.com",
            "streak": 7,
            "points": 1240,
            "level": 4,
            "semester": "5th Semester",
            "branch": "Computer Science & Engineering",
        }
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "streak": user.streak,
        "points": user.points,
        "level": user.level,
        "semester": user.semester,
        "branch": user.branch,
        "study_goal": user.study_goal,
    }

@router.put("")
async def update_profile(data: dict, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(User).limit(1))
    user = res.scalar_one_or_none()
    if user:
        for k, v in data.items():
            if hasattr(user, k):
                setattr(user, k, v)
        await db.commit()
    return {"status": "success", "data": data}
