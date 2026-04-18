import sqlite3

db_path = "mydb.db"

def print_schema():
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()

    cur.execute("SELECT name, sql FROM sqlite_master WHERE type='table';")
    rows = cur.fetchall()

    print("📜 Таблицы и схема:\n")
    for name, sql in rows:
        print(f"--- Таблица: {name} ---")
        print(sql)
        print()

    conn.close()

if __name__ == "__main__":
    print_schema()