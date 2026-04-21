import sqlite3

db_path = "mydb.db"

rows = [
    (104857621, "SHOES-AX1", "Кроссовки беговые мужские AirRun X1", 12, 3401, 501, 20.0),
    (104857622, "TSHIRT-BS2", "Футболка базовая оверсайз хлопок", 13, 3402, 501, 20.0),
    (104857623, "JACKET-NF3", "Куртка демисезонная утепленная", 14, 3403, 501, 20.0),
    (104857624, "PHONE-IP15", "Смартфон iPhone 15 Pro 256GB", 15, 3404, 502, 20.0),
    (104857625, "LAPTOP-MB", "MacBook Air M2 16/512", 16, 3405, 502, 20.0),
    (104857626, "HEADPHONES-S", "Наушники Sony WH-1000XM5", 17, 3406, 503, 20.0),
    (104857627, "WATCH-APP", "Часы Apple Watch Ultra", 18, 3407, 502, 20.0),
    (104857628, "BAG-GU", "Сумка Guess рюкзак мужской", 19, 3408, 504, 20.0),
    (104857629, "SNEAKERS-AD", "Кроссовки Adidas Yeezy 350", 20, 3409, 505, 20.0),
    (104857630, "JEANS-LV", "Джинсы Levi's 501 Original", 21, 3410, 506, 20.0),
    (104857631, "TV-SAMS", "Телевизор Samsung QLED 55\"", 22, 3411, 507, 20.0),
    (104857632, "CAMERA-SN", "Камера Sony Alpha 7 IV", 23, 3412, 503, 20.0),
]

conn = sqlite3.connect(db_path)
cur = conn.cursor()

cur.executemany('''
    INSERT INTO wb_products (nm_id, vendor_code, wb_product_name, brand_id, category_id, supplier_id, vat)
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

print("✅ 12 записей добавлены/обновлены в wb_products")