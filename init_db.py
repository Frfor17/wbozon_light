import sqlite3

db_path = "mydb.db"

def create_schema():
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = ON")
    cur = conn.cursor()

    # 1. Бренды
    cur.execute('''
        CREATE TABLE IF NOT EXISTS wb_brands (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            brand_name TEXT UNIQUE NOT NULL
        );
    ''')

    # 2. Категории (subject)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS wb_categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            parent_id INTEGER,
            name TEXT NOT NULL,
            FOREIGN KEY(parent_id) REFERENCES wb_categories(id)
        );
    ''')

    # 3. Производители/поставщики
    cur.execute('''
        CREATE TABLE IF NOT EXISTS wb_suppliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            vendor_name TEXT UNIQUE NOT NULL,
            vendor_code TEXT
        );
    ''')

    # 4. Сам товар/карточка (без JSON, но с ключевыми полями)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS wb_products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nm_id INTEGER UNIQUE NOT NULL,
            vendor_code TEXT,
            wb_product_name TEXT,
            brand_id INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            supplier_id INTEGER,
            adult INTEGER DEFAULT 0,
            vat REAL,
            height_mm INTEGER,
            length_mm INTEGER,
            width_mm INTEGER,
            weight_g INTEGER,
            created_at TEXT,
            updated_at TEXT NOT NULL DEFAULT (datetime('now')),
            FOREIGN KEY(brand_id) REFERENCES wb_brands(id),
            FOREIGN KEY(category_id) REFERENCES wb_categories(id),
            FOREIGN KEY(supplier_id) REFERENCES wb_suppliers(id)
        );
    ''')

    # 5. Размеры
    cur.execute('''
        CREATE TABLE IF NOT EXISTS wb_sizes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            chrt_id INTEGER UNIQUE,
            product_id INTEGER NOT NULL,
            size_name TEXT NOT NULL,
            FOREIGN KEY(product_id) REFERENCES wb_products(id)
        );
    ''')

    # 6. Остатки по размерам и складам
    cur.execute('''
        CREATE TABLE IF NOT EXISTS wb_stocks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            size_id INTEGER,
            warehouse TEXT,
            region TEXT,
            stock INTEGER,
            price REAL,
            discount_price REAL,
            updated_at TEXT NOT NULL DEFAULT (datetime('now')),
            FOREIGN KEY(product_id) REFERENCES wb_products(id),
            FOREIGN KEY(size_id) REFERENCES wb_sizes(id)
        );
    ''')

    # 7. Заказы
    cur.execute('''
        CREATE TABLE IF NOT EXISTS wb_orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id TEXT UNIQUE NOT NULL,
            order_date TEXT,
            region TEXT,
            total_amount REAL,
            currency TEXT DEFAULT 'RUB',
            status TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
    ''')

    # 8. Строки заказа
    cur.execute('''
        CREATE TABLE IF NOT EXISTS wb_order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            size_id INTEGER,
            quantity INTEGER,
            price REAL,
            FOREIGN KEY(order_id) REFERENCES wb_orders(id),
            FOREIGN KEY(product_id) REFERENCES wb_products(id),
            FOREIGN KEY(size_id) REFERENCES wb_sizes(id)
        );
    ''')

    # 9. Возвраты
    cur.execute('''
        CREATE TABLE IF NOT EXISTS wb_returns (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            return_id TEXT UNIQUE NOT NULL,
            order_id INTEGER,
            product_id INTEGER,
            size_id INTEGER,
            quantity INTEGER,
            status TEXT,
            return_date TEXT,
            FOREIGN KEY(order_id) REFERENCES wb_orders(id),
            FOREIGN KEY(product_id) REFERENCES wb_products(id),
            FOREIGN KEY(size_id) REFERENCES wb_sizes(id)
        );
    ''')

    # 10. Финансы/WB отчёты
    cur.execute('''
        CREATE TABLE IF NOT EXISTS wb_finance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            settlement_date TEXT,
            product_id INTEGER,
            amount REAL,
            vat REAL,
            commission REAL,
            storage_fee REAL,
            other_fee REAL,
            source_report TEXT, -- имя отчёта WB
            FOREIGN KEY(product_id) REFERENCES wb_products(id)
        );
    ''')

    # 11. Фотографии карточек
    cur.execute('''
        CREATE TABLE IF NOT EXISTS wb_images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            image_url TEXT,
            order_index INTEGER,
            FOREIGN KEY(product_id) REFERENCES wb_products(id)
        );
    ''')

    # 12. Атрибуты/характеристики товаров
    cur.execute('''
        CREATE TABLE IF NOT EXISTS wb_attributes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            attr_name TEXT,
            attr_value TEXT,
            FOREIGN KEY(product_id) REFERENCES wb_products(id)
        );
    ''')

    # 13. История остатков (по дням, по складам)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS wb_stock_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            size_id INTEGER,
            warehouse TEXT,
            region TEXT,
            stock INTEGER,
            snapshot_date TEXT NOT NULL,
            FOREIGN KEY(product_id) REFERENCES wb_products(id),
            FOREIGN KEY(size_id) REFERENCES wb_sizes(id)
        );
    ''')

    conn.commit()
    conn.close()


if __name__ == "__main__":
    create_schema()
    print(f"✅ База {db_path} и схема созданы.")
    print("Таблицы: 13+ таблиц в реляционной схеме, 3НФ, ориентированы на WB API (карточки, остатки, заказы, возвраты, финансы, отчёты, атрибуты и т.д.).")