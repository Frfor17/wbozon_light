import sqlite3

db_path = "mydb.db"  # путь к твоей БД

conn = sqlite3.connect(db_path)
cur = conn.cursor()

print("📋 СХЕМА таблицы users:")
cur.execute('PRAGMA table_info(users)')
schema = cur.fetchall()
for col in schema:
    print(f"  {col[1]:12} {col[2]:10} {'NOT NULL' if col[3] else ''}")

print("\n📊 КОЛИЧЕСТВО пользователей:", end=' ')
cur.execute('SELECT COUNT(*) FROM users')
user_count = cur.fetchone()[0]
print(f"{user_count}")

print("\n👥 ЗАПИСИ пользователей:")
cur.execute('SELECT id, username, email, role, created_at FROM users')
users = cur.fetchall()
if users:
    for user in users:
        print(f"  ID:{user[0]:4} | {user[1]:15} | {user[2] or 'нет':25} | {user[3]:8} | {user[4]}")
else:
    print("  Пусто")

conn.close()

print("\n✅ Готово!")