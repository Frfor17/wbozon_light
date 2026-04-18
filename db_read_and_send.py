from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # твой React‑порт
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "mydb.db"


@app.get("/api/products-count")
def get_products_count():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM wb_products;")
    count = cur.fetchone()[0]
    conn.close()
    print(f"✅ /api/products-count: прочитал {count} записей из wb_products")
    return {"count": count}