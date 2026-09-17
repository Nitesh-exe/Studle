# backend/app/db/init_db.py
import json
from sqlalchemy import select
from .session import engine, AsyncSessionLocal, Base
from .models import User, Subject, Topic, Task, Exam, Document, DocumentChunk, Quiz, QuizQuestion, AttendanceRecord

async def init_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        # Check if seed user exists
        res = await session.execute(select(User).limit(1))
        existing_user = res.scalar_one_or_none()

        if not existing_user:
            # Seed User
            user = User(
                id="user-1",
                name="Nitesh",
                email="nitesh@example.com",
                semester="5th Semester",
                branch="Computer Science & Engineering",
                streak=7,
                points=1240,
                level=4,
            )
            session.add(user)

            # Seed Subjects & Topics
            sub_dbms = Subject(
                id="sub-1",
                name="Database Management Systems",
                code="CS301",
                color="#6366f1",
                progress=65,
                importance=1.2,
            )
            sub_daa = Subject(
                id="sub-2",
                name="Design & Analysis of Algorithms",
                code="CS302",
                color="#ec4899",
                progress=48,
                importance=1.3,
            )
            sub_os = Subject(
                id="sub-3",
                name="Operating Systems",
                code="CS303",
                color="#10b981",
                progress=72,
                importance=1.1,
            )
            session.add_all([sub_dbms, sub_daa, sub_os])

            topics = [
                Topic(subject_id="sub-1", title="ER Diagrams & Relational Model", completed=True, mastery_score=85, importance=70),
                Topic(subject_id="sub-1", title="Relational Algebra & Normalization (1NF, 2NF, 3NF, BCNF)", completed=True, mastery_score=75, importance=90),
                Topic(subject_id="sub-1", title="SQL Joins, Subqueries & Transactions", completed=False, mastery_score=45, importance=95),
                Topic(subject_id="sub-1", title="B+ Trees & Indexing", completed=False, mastery_score=40, importance=85),

                Topic(subject_id="sub-2", title="Asymptotic Complexity (Big-O, Omega)", completed=True, mastery_score=90, importance=80),
                Topic(subject_id="sub-2", title="Divide & Conquer (MergeSort, QuickSort)", completed=True, mastery_score=80, importance=85),
                Topic(subject_id="sub-2", title="Dynamic Programming (0/1 Knapsack, LCS)", completed=False, mastery_score=35, importance=98),
                Topic(subject_id="sub-3", title="Process Scheduling (Round Robin, SJF)", completed=True, mastery_score=82, importance=88),
                Topic(subject_id="sub-3", title="Virtual Memory & Page Replacement", completed=False, mastery_score=50, importance=90),
            ]
            session.add_all(topics)

            # Seed Tasks
            tasks = [
                Task(subject_name="DBMS", title="Complete SQL Joins Assignment 3", priority="High", duration=45, due_date="Tomorrow"),
                Task(subject_name="DAA", title="Implement Dynamic Programming Knapsack in C++", priority="High", duration=60, due_date="In 3 days"),
                Task(subject_name="OS", title="Read Chapter 4: Virtual Memory Management", priority="Medium", duration=30, due_date="Yesterday", completed=True),
            ]
            session.add_all(tasks)

            # Seed Exams
            exams = [
                Exam(subject="Database Management Systems", title="Mid-Term Examination", date="Sep 22, 2026", days_left=5, progress=65, color="#6366f1", topics="Normalization, SQL, Transactions"),
                Exam(subject="Design & Analysis of Algorithms", title="Mid-Term Examination", date="Sep 29, 2026", days_left=12, progress=48, color="#ec4899", topics="Dynamic Programming, Greedy"),
                Exam(subject="Operating Systems", title="Semester Practical Exam", date="Oct 05, 2026", days_left=18, progress=72, color="#10b981", topics="Virtual Memory, Scheduling"),
            ]
            session.add_all(exams)

            # Seed Documents
            doc = Document(
                id="doc-1",
                title="DBMS-Unit-3-Indexing-B-Trees.pdf",
                subject_name="DBMS",
                chunk_count=3,
                processing_status="ready",
                summary="Comprehensive guide to indexing methods, B+ tree leaf nodes, query optimization strategies, and index scans.",
            )
            session.add(doc)

            chunks = [
                DocumentChunk(document_id="doc-1", content="B+ Tree is a self-balancing search tree where all data is stored in the leaf nodes. Non-leaf nodes only store keys to direct the search.", page_number=1, chunk_index=0),
                DocumentChunk(document_id="doc-1", content="Indexing in relational databases drastically reduces the number of disk I/O operations required when executing queries.", page_number=2, chunk_index=1),
                DocumentChunk(document_id="doc-1", content="Clustered index determines the physical order of data in a table. A table can have only one clustered index.", page_number=3, chunk_index=2),
            ]
            session.add_all(chunks)

            # Seed Attendance
            att = [
                AttendanceRecord(subject="Database Management Systems", held=24, attended=22),
                AttendanceRecord(subject="Design & Analysis of Algorithms", held=26, attended=23),
                AttendanceRecord(subject="Operating Systems", held=20, attended=18),
            ]
            session.add_all(att)

            await session.commit()
