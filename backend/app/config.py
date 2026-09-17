# backend/app/config.py
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_ENV: str = "development"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./studle.db")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
