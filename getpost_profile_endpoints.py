from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import time
import threading

app = FastAPI()

# CORS для фронта
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React порт
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_local = threading.local()

def get_db():
    if not hasattr(_local, "conn"):
        _local.conn = sqlite3.connect("mydb.db", check_same_thread=False)
        _local.conn.row_factory = sqlite3.Row
    return _local.conn

profiles_db = {"123456789": {"name": "ИП Борисов А.С.", "email": "seller@example.com", "id": "123456789"}}

@app.get("/api/profile")
async def get_profile(username: str = "123456789", db: sqlite3.Connection = Depends(get_db)):
    print(f"🟢 GET - ищем профиль: {username}")
    
    try:
        # SELECT из БД
        cur = db.cursor()
        cur.execute(
            "SELECT id, username, email FROM users WHERE username = ?", 
            (username,)
        )
        user = cur.fetchone()
        
        if user:
            profile = {
                "id": user[0],
                "name": user[1],  # username как name
                "email": user[2]
            }
            print(f"✅ Найден профиль: {profile}")
            return profile
        else:
            print(f"⚠️ Профиль '{username}' не найден")
            return {"id": None, "name": None, "email": None}
            
    except Exception as e:
        print(f"❌ Ошибка БД: {e}")
        raise HTTPException(status_code=500, detail="Ошибка получения профиля")

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

import sqlite3
from fastapi import HTTPException

@app.delete("/api/profile/delete")
async def delete_profile(username: str = "123456789"):  # ← параметр из запроса
    print("🔴 DELETE - удаляем профиль...")
    
    conn = sqlite3.connect("mydb.db")
    cur = conn.cursor()
    
    try:
        
        result = cur.execute(
            "DELETE FROM users WHERE username = ?", 
            (username,)
        ).rowcount  # ← количество удаленных строк
        
        conn.commit()
        
        if result > 0:
            print(f"✅ Профиль '{username}' УДАЛЕН из БД!")
            return {
                "status": "профиль удален ✅", 
                "deleted": username,
                "rows_affected": result
            }
        else:
            print(f"⚠️ Профиль '{username}' не найден")
            raise HTTPException(status_code=404, detail="Профиль не найден")
            
    except Exception as e:
        conn.rollback()
        print(f"❌ Ошибка удаления: {e}")
        raise HTTPException(status_code=500, detail="Ошибка БД")
        
    finally:
        conn.close()
        print("-" * 50)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


#  uvicorn getpost_profile_endpoints:app --reload --host 0.0.0.0 --port 8003