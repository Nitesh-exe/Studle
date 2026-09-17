# backend/app/main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .db.init_db import init_database
from .api.v1.router import api_v1_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB & Seed data
    await init_database()
    yield

app = FastAPI(
    title="Studle API",
    description="AI-Powered Academic Companion for College Students",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS configuration
origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()]
if not origins:
    origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_v1_router)

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "studle-backend"}

@app.get("/")
async def root():
    return {
        "name": "Studle Academic Companion API",
        "docs_url": "/docs",
        "status": "online",
    }
