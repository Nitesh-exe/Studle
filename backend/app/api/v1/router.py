# backend/app/api/v1/router.py
from fastapi import APIRouter
from .profile import router as profile_router
from .subjects import router as subjects_router
from .tasks import router as tasks_router
from .exams import router as exams_router
from .planning import router as planning_router
from .documents import router as documents_router
from .ai import router as ai_router
from .quizzes import router as quizzes_router
from .analytics import router as analytics_router
from .quantum import router as quantum_router

api_v1_router = APIRouter(prefix="/api/v1")

api_v1_router.include_router(profile_router, prefix="/profile", tags=["Profile"])
api_v1_router.include_router(subjects_router, prefix="/subjects", tags=["Subjects"])
api_v1_router.include_router(tasks_router, prefix="/tasks", tags=["Tasks"])
api_v1_router.include_router(exams_router, prefix="/exams", tags=["Exams"])
api_v1_router.include_router(planning_router, prefix="/planning", tags=["Planning"])
api_v1_router.include_router(documents_router, prefix="/documents", tags=["Documents"])
api_v1_router.include_router(ai_router, prefix="/ai", tags=["AI"])
api_v1_router.include_router(quizzes_router, prefix="/quizzes", tags=["Quizzes"])
api_v1_router.include_router(analytics_router, prefix="/analytics", tags=["Analytics"])
api_v1_router.include_router(quantum_router, prefix="/quantum", tags=["Quantum"])

# Also provide syllabus alias route for frontend compatibility
api_v1_router.add_api_route("/syllabus/upload", ai_router.routes[1].endpoint, methods=["POST"])
api_v1_router.add_api_route("/topics/{topic_id}/progress", subjects_router.routes[3].endpoint, methods=["POST"])
