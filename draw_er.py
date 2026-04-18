import sqlite3

db_path = "mydb.db"

def print_er():
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()

    # Получаем таблицы
    cur.execute("SELECT name, sql FROM sqlite_master WHERE type='table';")
    table_rows = cur.fetchall()

    tables = {}
    for name, sql in table_rows:
        tables[name] = sql

    print("📊 ER‑отчёт (отношения):")
    print("=" * 50)

    for name, sql in tables.items():
        print(f"🔸 Таблица: {name}")
        print(sql)
        print()

    # Тут можно добавить анализ внешних ключей (если есть pattern FOREIGN KEY)
    for name, sql in tables.items():
        if "FOREIGN KEY" in sql:
            print(f"🔗 Обнаружена связь в таблице: {name}")
            print(sql)
            print()

    conn.close()

if __name__ == "__main__":
    print_er()