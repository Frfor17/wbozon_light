import sqlite3

db_path = "mydb.db"

def add_ad_table():
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = ON")
    cur = conn.cursor()
    
    # Новая таблица для рекламы WB API
    cur.execute('''
        CREATE TABLE IF NOT EXISTS wb_ad_stats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER,
            campaign_id INTEGER,
            date TEXT,
            spend REAL,        -- расходы на рекламу (руб.)
            impressions INTEGER,
            clicks INTEGER,
            orders INTEGER,
            ctr REAL,          -- кликабельность
            source_api TEXT,   -- /adv/v3/fullstats и т.д.
            FOREIGN KEY(product_id) REFERENCES wb_products(id)
        );
    ''')
    
    conn.commit()
    conn.close()
    print("✅ Таблица wb_ad_stats добавлена.")

if __name__ == "__main__":
    add_ad_table()