import sqlite3
from datetime import datetime

db_path = "mydb.db"

conn = sqlite3.connect(db_path)
conn.execute("PRAGMA foreign_keys = ON")
cur = conn.cursor()

# Очистка в правильном порядке
for table in [
    "wb_stock_history",
    "wb_attributes",
    "wb_images",
    "wb_finance",
    "wb_returns",
    "wb_order_items",
    "wb_orders",
    "wb_stocks",
    "wb_sizes",
    "wb_products",
    "wb_suppliers",
    "wb_categories",
    "wb_brands",
]:
    cur.execute(f"DELETE FROM {table}")

# Бренды
brands = [("AirRun",), ("NordFit",), ("UrbanBase",)]
cur.executemany("INSERT INTO wb_brands (brand_name) VALUES (?)", brands)

# Категории
categories = [
    (None, "Одежда"),
    (1, "Обувь"),
    (1, "Куртки"),
]
cur.executemany("INSERT INTO wb_categories (parent_id, name) VALUES (?, ?)", categories)

# Поставщики
suppliers = [
    ("ООО Вектор", "VEC-01"),
    ("ООО ПрофиТрейд", "PRO-02"),
    ("ИП Сидоров", "SID-03"),
]
cur.executemany("INSERT INTO wb_suppliers (vendor_name, vendor_code) VALUES (?, ?)", suppliers)

# Товары
products = [
    (104857621, "SHOES-AX1", "Кроссовки беговые мужские AirRun X1", 1, 2, 1, 0, 20.0, 120, 310, 210, 850, datetime.now().isoformat()),
    (104857622, "TSHIRT-BS2", "Футболка базовая оверсайз хлопок", 2, 1, 2, 0, 20.0, 10, 300, 250, 220, datetime.now().isoformat()),
    (104857623, "JACKET-NF3", "Куртка демисезонная утепленная", 3, 3, 3, 0, 20.0, 80, 400, 300, 950, datetime.now().isoformat()),
]
cur.executemany("""
    INSERT INTO wb_products
    (nm_id, vendor_code, wb_product_name, brand_id, category_id, supplier_id, adult, vat,
     height_mm, length_mm, width_mm, weight_g, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(nm_id) DO UPDATE SET
        vendor_code = excluded.vendor_code,
        wb_product_name = excluded.wb_product_name,
        brand_id = excluded.brand_id,
        category_id = excluded.category_id,
        supplier_id = excluded.supplier_id,
        adult = excluded.adult,
        vat = excluded.vat,
        height_mm = excluded.height_mm,
        length_mm = excluded.length_mm,
        width_mm = excluded.width_mm,
        weight_g = excluded.weight_g,
        created_at = excluded.created_at,
        updated_at = datetime('now')
""", products)

# Получаем реальные product_id
cur.execute("SELECT id, nm_id FROM wb_products")
product_map = {nm_id: pid for pid, nm_id in cur.fetchall()}

# Размеры
sizes = [
    (None, product_map[104857621], "42"),
    (None, product_map[104857621], "43"),
    (None, product_map[104857622], "M"),
    (None, product_map[104857623], "48"),
]
cur.executemany("INSERT INTO wb_sizes (chrt_id, product_id, size_name) VALUES (?, ?, ?)", sizes)

# Берем размеры
cur.execute("SELECT id, product_id, size_name FROM wb_sizes")
size_rows = cur.fetchall()
size_map = {}
for sid, pid, sname in size_rows:
    size_map.setdefault(pid, []).append(sid)

# Остатки
stocks = [
    (product_map[104857621], size_map[product_map[104857621]][0], "Склад Москва", "ЦФО", 25, 4990.0, 3990.0),
    (product_map[104857621], size_map[product_map[104857621]][1], "Склад Казань", "ПФО", 18, 4990.0, 3990.0),
    (product_map[104857622], size_map[product_map[104857622]][0], "Склад Москва", "ЦФО", 42, 1290.0, 990.0),
    (product_map[104857623], size_map[product_map[104857623]][0], "Склад Екатеринбург", "УФО", 9, 6990.0, 5490.0),
]
cur.executemany("""
    INSERT INTO wb_stocks
    (product_id, size_id, warehouse, region, stock, price, discount_price)
    VALUES (?, ?, ?, ?, ?, ?, ?)
""", stocks)

# Атрибуты
attributes = [
    (product_map[104857621], "Материал", "Текстиль"),
    (product_map[104857621], "Сезон", "Всесезонный"),
    (product_map[104857622], "Материал", "Хлопок"),
    (product_map[104857622], "Посадка", "Оверсайз"),
    (product_map[104857623], "Материал", "Полиэстер"),
    (product_map[104857623], "Утеплитель", "Синтепон"),
]
cur.executemany("""
    INSERT INTO wb_attributes (product_id, attr_name, attr_value)
    VALUES (?, ?, ?)
""", attributes)

# Картинки
images = [
    (product_map[104857621], "images/104857621_1.jpg", 1),
    (product_map[104857621], "images/104857621_2.jpg", 2),
    (product_map[104857621], "images/104857621_3.jpg", 3),
    (product_map[104857622], "images/104857622_1.jpg", 1),
    (product_map[104857622], "images/104857622_2.jpg", 2),
    (product_map[104857622], "images/104857622_3.jpg", 3),
    (product_map[104857623], "images/104857623_1.jpg", 1),
    (product_map[104857623], "images/104857623_2.jpg", 2),
    (product_map[104857623], "images/104857623_3.jpg", 3),
]
cur.executemany("""
    INSERT INTO wb_images (product_id, image_url, order_index)
    VALUES (?, ?, ?)
""", images)

# История остатков
stock_history = [
    (product_map[104857621], size_map[product_map[104857621]][0], "Склад Москва", "ЦФО", 25, "2026-04-18"),
    (product_map[104857621], size_map[product_map[104857621]][1], "Склад Казань", "ПФО", 18, "2026-04-18"),
    (product_map[104857622], size_map[product_map[104857622]][0], "Склад Москва", "ЦФО", 42, "2026-04-18"),
    (product_map[104857623], size_map[product_map[104857623]][0], "Склад Екатеринбург", "УФО", 9, "2026-04-18"),
]
cur.executemany("""
    INSERT INTO wb_stock_history
    (product_id, size_id, warehouse, region, stock, snapshot_date)
    VALUES (?, ?, ?, ?, ?, ?)
""", stock_history)

conn.commit()
conn.close()

print("✅ База заполнена тестовыми данными")