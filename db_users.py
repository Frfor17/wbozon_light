import sqlite3
import hashlib
import secrets

db_path = "mydb.db"

def add_users_table():
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = ON")
    cur = conn.cursor()
    
    # Создаём таблицу users (если нет)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            email TEXT UNIQUE,
            role TEXT DEFAULT 'user',
            created_at TEXT DEFAULT (datetime('now'))
        )
    ''')
    
    # Генерируем тестовых юзеров (пароли: admin/123456, user/123456)
    users = [
        ('admin', hashlib.pbkdf2_hmac(128, b'123456', b'salt1', 100000).hex()),
        ('user1', hashlib.pbkdf2_hmac(128, b'123456', b'salt2', 100000).hex()),
        ('user2', hashlib.pbkdf2_hmac(128, b'123456', b'salt3', 100000).hex())
    ]
    
    cur.executemany('''
        INSERT OR IGNORE INTO users (username, password_hash)
        VALUES (?, ?)
    ''', users)
    
    conn.commit()
    conn.close()
    print("✅ Таблица users добавлена + 3 тестовых аккаунта")

if __name__ == "__main__":
    add_users_table()