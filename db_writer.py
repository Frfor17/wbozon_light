import sqlite3

db_path = "mydb.db"

conn = sqlite3.connect(db_path)
cur = conn.cursor()

# Вставляем одну тестовую карточку
cur.execute('''
    INSERT INTO wb_products 
    (nm_id, vendor_code, wb_product_name, brand_id, category_id, supplier_id, vat)
    VALUES (?, ?, ?, ?, ?, ?, ?)
''', (
    111111,
    "ABC-123",
    "Тестовый кроссовок",
    1,
    1,
    1,
    20.0
))

conn.commit()
conn.close()

print("✅ Одна тестовая запись добавлена в wb_products")