from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import time

app = FastAPI()

# CORS для фронта
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React порт
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


profiles_db = {"123456789": {"name": "ИП Борисов А.С.", "email": "seller@example.com", "id": "123456789"}}

@app.get("/api/profile")
async def get_profile():
    profile = profiles_db.get("123456789")
    print("🟢 GET - возвращаем:", profile)
    return profile or {"name": None, "email": None, "id": None}

# Тестовые роуты для кнопок
@app.post("/api/profile/new")
async def create_profile():
    return {"status": "новый профиль создан", "id": 999}

@app.put("/api/profile/edit")
async def edit_profile():
    return {"status": "профиль обновлен"}

@app.post("/api/profile/settings")
async def update_settings():
    return {"status": "настройки сохранены"}

@app.delete("/api/profile/delete")
async def delete_profile():
    print("🔴 DELETE - удаляем профиль...")
    if "123456789" in profiles_db:
        del profiles_db["123456789"]  # ← РЕАЛЬНОЕ удаление!
        print("✅ ПРОФИЛЬ УДАЛЕН из БД!")
    else:
        print("⚠️ Профиль уже удален")
    
    result = {"name": None, "email": None, "id": None, "status": "профиль удален ✅"}
    print("📤 Ответ:", result)
    print("-" * 50)
    return result

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)