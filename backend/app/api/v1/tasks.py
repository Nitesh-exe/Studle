# backend/app/api/v1/tasks.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ...db.session import get_db
from ...db.models import Task

router = APIRouter()

@router.get("")
async def get_tasks(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Task).order_by(Task.created_at.desc()))
    tasks = res.scalars().all()
    return [
        {
            "id": t.id,
            "title": t.title,
            "subject": t.subject_name,
            "priority": t.priority,
            "duration": t.duration,
            "dueDate": t.due_date,
            "completed": t.completed,
        }
        for t in tasks
    ]

@router.post("")
async def create_task(data: dict, db: AsyncSession = Depends(get_db)):
    task = Task(
        title=data.get("title", ""),
        subject_name=data.get("subject", "General"),
        priority=data.get("priority", "Medium"),
        duration=data.get("duration", 30),
        due_date=data.get("dueDate", "Soon"),
        completed=bool(data.get("completed", False)),
    )
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return {
        "id": task.id,
        "title": task.title,
        "subject": task.subject_name,
        "priority": task.priority,
        "duration": task.duration,
        "dueDate": task.due_date,
        "completed": task.completed,
    }

@router.put("/{task_id}")
async def update_task(task_id: str, data: dict, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Task).where(Task.id == task_id))
    task = res.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if "completed" in data:
        task.completed = bool(data["completed"])
    if "title" in data:
        task.title = data["title"]
    if "priority" in data:
        task.priority = data["priority"]

    await db.commit()
    return {"status": "success", "id": task.id, "completed": task.completed}

@router.delete("/{task_id}")
async def delete_task(task_id: str, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Task).where(Task.id == task_id))
    task = res.scalar_one_or_none()
    if task:
        await db.delete(task)
        await db.commit()
    return {"status": "deleted", "id": task_id}
