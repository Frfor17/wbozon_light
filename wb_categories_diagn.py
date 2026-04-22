import sqlite3

db_path = "mydb.db"
conn = sqlite3.connect(db_path)
cur = conn.cursor()

# 1. ПРОВЕРКА: сколько категорий?
cur.execute("SELECT COUNT(*) FROM wb_categories")
cat_count = cur.fetchone()[0]
print(f"📂 Категорий в wb_categories: {cat_count}")

# 2. ПРОВЕРКА: какие category_id используются в продуктах?
cur.execute("""
    SELECT DISTINCT category_id, COUNT(*) as products_count 
    FROM wb_products 
    GROUP BY category_id 
    ORDER BY products_count DESC
""")
used_cats = cur.fetchall()
print(f"\n🔍 Используемые category_id в продуктах:")
for cat_id, count in used_cats[:10]:
    print(f"  category_id={cat_id}: {count} продуктов")

# 3. ПРОБЛЕМА: битые ссылки (category_id нет в wb_categories)
cur.execute("""
    SELECT category_id, COUNT(*) 
    FROM wb_products p 
    LEFT JOIN wb_categories c ON p.category_id = c.id 
    WHERE c.id IS NULL 
    GROUP BY category_id
""")
broken = cur.fetchall()
print(f"\n💥 БИТЫЕ ССЫЛКИ (нет в wb_categories):")
for cat_id, count in broken:
    print(f"  category_id={cat_id}: {count} продуктов")

conn.close()