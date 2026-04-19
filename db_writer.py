import sqlite3

db_path = "mydb.db"

rows = [
    (104857621, "SHOES-AX1", "Кроссовки беговые мужские AirRun X1", 12, 3401, 501, 20.0),
    (104857622, "TSHIRT-BS2", "Футболка базовая оверсайз хлопок", 13, 3402, 501, 20.0),
    (104857623, "JACKET-NF3", "Куртка демисезонная утепленная", 14, 3403, 501, 20.0),
]

conn = sqlite3.connect(db_path)
cur = conn.cursor()

cur.executemany('''
    INSERT INTO wb_products
    (nm_id, vendor_code, wb_product_name, brand_id, category_id, supplier_id, vat)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(nm_id) DO UPDATE SET
        vendor_code = excluded.vendor_code,
        wb_product_name = excluded.wb_product_name,
        brand_id = excluded.brand_id,
        category_id = excluded.category_id,
        supplier_id = excluded.supplier_id,
        vat = excluded.vat
''', rows)

conn.commit()
conn.close()

print("✅ Записи добавлены или обновлены в wb_products")