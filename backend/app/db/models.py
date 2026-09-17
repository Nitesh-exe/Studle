# backend/app/db/models.py
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .session import Base

def gen_uuid() -> str:
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=gen_uuid)
    name = Column(String, nullable=False, default="Nitesh")
    email = Column(String, nullable=False, default="nitesh@example.com")
    semester = Column(String, default="5th Semester")
    branch = Column(String, default="Computer Science & Engineering")
    college = Column(String, default="National Institute of Technology")
    study_goal = Column(String, default="Crack Core Engineering Placements & Master Systems")
    streak = Column(Integer, default=7)
    points = Column(Integer, default=1240)
    level = Column(Integer, default=4)
    created_at = Column(DateTime, default=datetime.utcnow)

class Subject(Base):
    __tablename__ = "subjects"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_id = Column(String, default="user-1")
    name = Column(String, nullable=False)
    code = Column(String, default="")
    color = Column(String, default="#6366f1")
    progress = Column(Integer, default=0)
    importance = Column(Float, default=1.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    topics = relationship("Topic", back_populates="subject", cascade="all, delete-orphan")

class Topic(Base):
    __tablename__ = "topics"

    id = Column(String, primary_key=True, default=gen_uuid)
    subject_id = Column(String, ForeignKey("subjects.id"), nullable=False)
    parent_id = Column(String, nullable=True)
    title = Column(String, nullable=False)
    description = Column(Text, default="")
    difficulty = Column(String, default="Medium")
    importance = Column(Float, default=80.0)
    mastery_score = Column(Float, default=50.0)
    completed = Column(Boolean, default=False)

    subject = relationship("Subject", back_populates="topics")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_id = Column(String, default="user-1")
    subject_name = Column(String, default="General")
    title = Column(String, nullable=False)
    description = Column(Text, default="")
    due_date = Column(String, default="Soon")
    priority = Column(String, default="Medium")
    duration = Column(Integer, default=30)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Exam(Base):
    __tablename__ = "exams"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_id = Column(String, default="user-1")
    title = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    date = Column(String, nullable=False)
    days_left = Column(Integer, default=7)
    progress = Column(Integer, default=50)
    color = Column(String, default="#6366f1")
    topics = Column(String, default="")

class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_id = Column(String, default="user-1")
    title = Column(String, nullable=False)
    file_type = Column(String, default="application/pdf")
    subject_name = Column(String, default="General")
    chunk_count = Column(Integer, default=0)
    processing_status = Column(String, default="ready")
    summary = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")

class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(String, primary_key=True, default=gen_uuid)
    document_id = Column(String, ForeignKey("documents.id"), nullable=False)
    content = Column(Text, nullable=False)
    page_number = Column(Integer, default=1)
    chunk_index = Column(Integer, default=0)

    document = relationship("Document", back_populates="chunks")

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_id = Column(String, default="user-1")
    subject_name = Column(String, default="General")
    title = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    questions = relationship("QuizQuestion", back_populates="quiz", cascade="all, delete-orphan")

class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id = Column(String, primary_key=True, default=gen_uuid)
    quiz_id = Column(String, ForeignKey("quizzes.id"), nullable=False)
    question = Column(Text, nullable=False)
    options_json = Column(Text, nullable=False) # JSON string of list
    correct_index = Column(Integer, default=0)
    explanation = Column(Text, default="")

    quiz = relationship("Quiz", back_populates="questions")

class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"

    id = Column(String, primary_key=True, default=gen_uuid)
    quiz_id = Column(String, nullable=False)
    user_id = Column(String, default="user-1")
    score = Column(Integer, default=0)
    total = Column(Integer, default=0)
    completed_at = Column(DateTime, default=datetime.utcnow)

class StudySession(Base):
    __tablename__ = "study_sessions"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_id = Column(String, default="user-1")
    subject_name = Column(String, default="General")
    duration_minutes = Column(Integer, default=25)
    started_at = Column(DateTime, default=datetime.utcnow)

class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_id = Column(String, default="user-1")
    name = Column(String, nullable=False)
    description = Column(Text, default="")
    deadline = Column(String, default="")
    progress = Column(Integer, default=0)

    milestones = relationship("ProjectMilestone", back_populates="project", cascade="all, delete-orphan")

class ProjectMilestone(Base):
    __tablename__ = "project_milestones"

    id = Column(String, primary_key=True, default=gen_uuid)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    title = Column(String, nullable=False)
    completed = Column(Boolean, default=False)

    project = relationship("Project", back_populates="milestones")

class AttendanceRecord(Base):
    __tablename__ = "attendance_records"

    id = Column(String, primary_key=True, default=gen_uuid)
    user_id = Column(String, default="user-1")
    subject = Column(String, nullable=False)
    held = Column(Integer, default=20)
    attended = Column(Integer, default=18)
