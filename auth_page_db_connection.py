from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import hashlib
import json
import logging
from fastapi.responses import HTMLResponse

logging.basicConfig(level=logging.DEBUG)
print("🚀 FastAPI запустился! Готов к логам")

app = FastAPI(title="SellerAI Auth")

#http://localhost:5173
#http://111.88.149.68:5173
#111.88.149.68
# CORS для React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://111.88.149.68:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_path = "mydb.db"

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str

@app.post("/api/login")
async def login(request: LoginRequest):
    # 🔥 ЛОГ: что прилетело
    print("🔍 LOGIN ПРИШЁЛ:", json.dumps(request.dict(), indent=2, ensure_ascii=False))
    
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    
    cur.execute(
        'SELECT id, username, email, role FROM users WHERE email = ? AND password_hash = ?',
        (request.email, hash_password(request.password))
    )
    user = cur.fetchone()
    
    # 🔥 ЛОГ: что найдено в БД
    print("🔍 НАЙДЕН В БД:", user)
    conn.close()
    
    if user:
        result = {
            "success": True,
            "user": {"id": user["id"], "username": user["username"], "email": user["email"], "role": user["role"]}
        }
        print("✅ LOGIN OK:", json.dumps(result, indent=2, ensure_ascii=False))
        return result
    else:
        print("❌ LOGIN FAIL: нет такого юзера")
        raise HTTPException(status_code=401, detail="Неверный email или пароль")

@app.post("/api/register")
async def register(request: RegisterRequest):
    # 🔥 ЛОГ: что прилетело
    print("🔍 REGISTER ПРИШЁЛ:", json.dumps(request.dict(), indent=2, ensure_ascii=False))
    
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    try:
        cur.execute('''
            INSERT INTO users (username, password_hash, email, role) 
            VALUES (?, ?, ?, 'user')
        ''', (request.username, hash_password(request.password), request.email))
        conn.commit()
        result = {"success": True, "message": "Аккаунт создан"}
        print("✅ REGISTER OK:", json.dumps(result, indent=2, ensure_ascii=False))
        return result
    except sqlite3.IntegrityError as e:
        print("❌ REGISTER FAIL:", str(e))
        raise HTTPException(status_code=400, detail="Пользователь уже существует")
    finally:
        conn.close()

@app.get("/admin", response_class=HTMLResponse)
async def admin_dashboard():
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    # Список всех таблиц
    cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
    tables = [row[0] for row in cur.fetchall()]
    
    # Статистика
    html = """
    <!DOCTYPE html>
    <html><head><title>SellerAI Admin</title>
    <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;min-height:100vh;padding:2rem}
    .container{max-width:1400px;margin:0 auto}
    h1{font-size:2.5rem;margin-bottom:1rem;background:linear-gradient(45deg,#ff6b6b,#4ecdc4);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .stats{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.5rem;margin:2rem 0}
    .stat{background:hsla(0,0%,100%,.1);backdrop-filter:blur(10px);border:1px solid hsla(0,0%,100%,.2);border-radius:16px;padding:1.5rem;text-align:center;transition:all .3s}
    .stat:hover{transform:translateY(-5px);box-shadow:0 20px 40px rgba(0,0,0,.2)}
    .stat h3{font-size:1.1rem;color:#a0a0ff;margin-bottom:.5rem}
    .stat .count{font-size:2.5rem;font-weight:700;background:linear-gradient(45deg,#ff6b6b,#4ecdc4);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    table{width:100%;background:hsla(0,0%,100%,.1);backdrop-filter:blur(10px);border-radius:12px;overflow:hidden;border:1px solid hsla(0,0%,100%,.2);margin-top:2rem}
    th{background:linear-gradient(90deg,#1e3c72,#2a5298);padding:1rem;font-weight:600;text-align:left}
    td{padding:1rem;border-bottom:1px solid hsla(0,0%,100%,.1)}
    tr:hover{background:hsla(0,0%,100%,.05)}
    .links{display:flex;gap:1rem;margin-top:2rem;flex-wrap:wrap}
    .links a{padding:12px 24px;background:#ff6b6b;border:none;border-radius:8px;color:white;text-decoration:none;font-weight:500;transition:all .3s}
    .links a:hover{background:#ff5252;transform:translateY(-2px)}
    </style>
    </head><body>
    <div class="container">
        <h1>🚀 SellerAI Admin Dashboard</h1>
        <p style="margin-bottom:2rem">Все данные из твоей БД в реальном времени</p>
    """
    
    # Статистика таблиц
    html += '<div class="stats">'
    for table in tables[:12]:
        cur.execute(f"SELECT COUNT(*) FROM [{table}]")
        count = cur.fetchone()[0]
        html += f'''
        <div class="stat">
            <h3>{table}</h3>
            <div class="count">{count:,}</div>
        </div>
        '''
    html += '</div>'
    
    # Таблица со статистикой
    html += '<table><tr><th>Таблица</th><th>Записей</th></tr>'
    for table in tables:
        cur.execute(f"SELECT COUNT(*) FROM [{table}]")
        count = cur.fetchone()[0]
        html += f'<tr><td style="font-family:monospace">{table}</td><td style="font-weight:600">{count:,}</td></tr>'
    html += '</table>'
    
    conn.close()
    html += '''
    <div class="links">
        <a href="/docs">📚 API Документация</a>
        <a href="/">🏠 Главная</a>
        <a href="/api/login">🔐 Тест API</a>
    </div>
    </div>
    </body></html>
    '''
    
    return HTMLResponse(content=html)



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

# uvicorn auth_page_db_connection:app --reload --host 0.0.0.0 --port 8000
# uvicorn auth_page_db_connection:app --reload --host 0.0.0.0 --port 8000

# http://localhost:8000/admin админ

#admin@example.com admin123
#test@example.com test123