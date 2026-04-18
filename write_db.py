import sqlite3

db_path = "mydb.db"
conn = sqlite3.connect(db_path)
cur = conn.cursor()

# Вставка в таблицу name
cur.execute("INSERT INTO name (created_at) VALUES (datetime('now'));")
name_id = cur.lastrowid

# Вставка в таблицу second_name с ссылкой на name
cur.execute(
    "INSERT INTO second_name (name_id, something) VALUES (?, ?);",
    (name_id, "тестовая запись"),
)

conn.commit()
conn.close()

print("✅ Добавлены примеры записей в name и second_name")