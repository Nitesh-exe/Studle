# backend/app/api/v1/subjects.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from ...db.session import get_db
from ...db.models import Subject, Topic

router = APIRouter()

@router.get("")
async def get_subjects(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Subject).options(selectinload(Subject.topics)))
    subjects = res.scalars().all()

    output = []
    for s in subjects:
        top_list = [
            {
                "id": t.id,
                "title": t.title,
                "description": t.description,
                "difficulty": t.difficulty,
                "completed": t.completed,
                "mastery_score": t.mastery_score,
                "importance": t.importance,
            }
            for t in s.topics
        ]
        comp = sum(1 for t in top_list if t["completed"])
        prog = round((comp / len(top_list)) * 100) if top_list else 0

        output.append({
            "id": s.id,
            "name": s.name,
            "code": s.code,
            "color": s.color,
            "progress": prog,
            "completedTopics": comp,
            "totalTopics": len(top_list),
            "topics": top_list,
        })
    return output

@router.post("")
async def create_subject(data: dict, db: AsyncSession = Depends(get_db)):
    new_sub = Subject(
        name=data.get("name", "New Subject"),
        code=data.get("code", ""),
        color=data.get("color", "#6366f1"),
        progress=0,
    )
    db.add(new_sub)
    await db.flush()

    # Add default fundamental topic
    default_topic = Topic(
        subject_id=new_sub.id,
        title="Introduction & Overview",
        completed=False,
    )
    db.add(default_topic)
    await db.commit()

    return {"id": new_sub.id, "name": new_sub.name, "code": new_sub.code, "color": new_sub.color}

@router.get("/{subject_id}/topics")
async def get_topics(subject_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Topic).where(Topic.subject_id == subject_id))
    topics = res.scalars().all()
    return topics

@router.post("/topics/{topic_id}/progress")
async def update_topic_progress(topic_id: str, data: dict, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Topic).where(Topic.id == topic_id))
    topic = res.scalar_one_or_none()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    topic.completed = bool(data.get("completed", False))
    if topic.completed and topic.mastery_score < 70:
        topic.mastery_score = 75.0

    await db.commit()
    return {"status": "success", "completed": topic.completed}
