import sqlite3
import hashlib
import secrets

db_path = "mydb.db"  # путь к твоей БД

def hash_password(password):
    """Простой хэш пароля (в продакшене используй bcrypt/argon2)"""
    return hashlib.sha256(password.encode()).hexdigest()

# Данные для добавления
users_to_add = [
    ("admin", "admin123", "admin@example.com", "admin"),
    ("testuser", "test123", "test@example.com", "user")
]

conn = sqlite3.connect(db_path)
cur = conn.cursor()

added_count = 0
for username, password, email, role in users_to_add:
    password_hash = hash_password(password)
    
    try:
        cur.execute('''
            INSERT INTO users (username, password_hash, email, role)
            VALUES (?, ?, ?, ?)
        ''', (username, password_hash, email, role))
        added_count += 1
        print(f"✅ Добавлен: {username} (роль: {role})")
    except sqlite3.IntegrityError:
        print(f"⚠️  {username} уже существует")

conn.commit()
conn.close()

print(f"\n🎉 Добавлено {added_count} пользователей!")
print("\n📝 Логин/пароль:")
print("  admin / admin123 (админ)")
print("  testuser / test123 (обычный)")