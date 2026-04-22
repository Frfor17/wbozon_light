# wb_categories_fix.py
import sqlite3

db_path = "mydb.db"
conn = sqlite3.connect(db_path)
cur = conn.cursor()

# Создаём недостающие категории
missing_ids = [3401,3402,3403,3404,3405,3406,3407,3408,3409,3410,3411,3412]
for cat_id in missing_ids:
    cur.execute("""
        INSERT OR IGNORE INTO wb_categories (id, name) 
        VALUES (?, 'Категория WB #' || ?)
    """, (cat_id, cat_id))

conn.commit()
conn.close()
print("✅ Все 12 категорий созданы!")