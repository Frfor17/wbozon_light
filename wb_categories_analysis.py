# wb_categories_analysis.py
import sqlite3
import json

db_path = "mydb.db"
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

print("🔍 АНАЛИЗ КАТЕГОРИЙ И ТОВАРОВ\n" + "="*50)

# 1. ОБЩАЯ СТАТИСТИКА
print("\n📊 1. ОБЩАЯ СТАТИСТИКА")
cur.execute("SELECT COUNT(*) FROM wb_products")
products_total = cur.fetchone()[0]
print(f"   Всего продуктов: {products_total:,}")

cur.execute("""
    SELECT 
        c.id, 
        c.name, 
        COUNT(p.id) as products_count
    FROM wb_categories c
    LEFT JOIN wb_products p ON c.id = p.category_id
    GROUP BY c.id, c.name
    ORDER BY products_count DESC, c.id
""")
categories = cur.fetchall()
print(f"   Категорий с товарами: {len([c for c in categories if c['products_count'] > 0])}")

# 2. ТОП-10 КАТЕГОРИЙ ПО ТОВАРАМ
print("\n🏆 2. ТОП-10 КАТЕГОРИЙ")
for i, cat in enumerate(categories[:10], 1):
    print(f"   {i}. {cat['id']:4} '{cat['name']:20}' → {cat['products_count']:3,} товаров")

# 3. ТОВАРЫ ПО КАТЕГОРИЯМ (первые 3 примера)
print("\n📦 3. ПРИМЕРЫ ТОВАРОВ ПО КАТЕГОРИЯМ")
for cat in categories[:8]:  # первые 8 категорий
    if cat['products_count'] > 0:
        cur.execute("""
            SELECT nm_id, wb_product_name, brand_id 
            FROM wb_products 
            WHERE category_id = ?
            LIMIT 3
        """, (cat['id'],))
        products = cur.fetchall()
        print(f"\n   Категория {cat['id']} '{cat['name']}':")
        for prod in products:
            print(f"     📱 {prod['nm_id']:8} | {prod['wb_product_name'][:50]:50} | бренд:{prod['brand_id']}")

# 4. БРЕНДЫ ПО КАТЕГОРИЯМ
print("\n🏷️  4. БРЕНДЫ ПО КАТЕГОРИЯМ (ТОП-3)")
cur.execute("""
    SELECT 
        c.id as cat_id,
        c.name as cat_name,
        b.brand_name,
        COUNT(p.id) as count
    FROM wb_categories c
    JOIN wb_products p ON c.id = p.category_id
    JOIN wb_brands b ON p.brand_id = b.id
    GROUP BY c.id, b.brand_name
    ORDER BY c.id, count DESC
    LIMIT 15
""")
brands_by_cat = cur.fetchall()
print("   Формат: категория_id 'название' → бренд (товаров)")
for row in brands_by_cat:
    print(f"     {row['cat_id']:4} '{row['cat_name'][:20]:20}' → {row['brand_name'][:15]:15} ({row['count']:2})")

conn.close()
print("\n✅ АНАЛИЗ ЗАВЕРШЁН!")