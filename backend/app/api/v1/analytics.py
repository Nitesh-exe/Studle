# backend/app/api/v1/analytics.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ...db.session import get_db
from ...db.models import Subject, AttendanceRecord, StudySession

router = APIRouter()

@router.get("/overview")
async def get_analytics_overview(db: AsyncSession = Depends(get_db)):
    res_subs = await db.execute(select(Subject))
    subs = res_subs.scalars().all()

    res_att = await db.execute(select(AttendanceRecord))
    att_records = res_att.scalars().all()

    return {
        "subjects": [
            {"subject": s.code or s.name, "progress": s.progress, "name": s.name}
            for s in subs
        ],
        "attendance": [
            {
                "subject": a.subject,
                "held": a.held,
                "attended": a.attended,
                "percentage": round((a.attended / a.held) * 100, 1) if a.held else 100.0,
            }
            for a in att_records
        ],
    }
