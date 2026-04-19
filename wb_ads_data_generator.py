import sqlite3
import random
from datetime import datetime, timedelta

db_path = "mydb.db"

def generate_ad_data():
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    # Получаем существующие product_id
    cur.execute("SELECT DISTINCT id FROM wb_products LIMIT 5")  # 5 уникальных товаров
    products = [row[0] for row in cur.fetchall()]
    
    if not products:
        print("⚠️ Нет продуктов в wb_products! Добавьте сначала.")
        return
    
    print(f"📦 Используем продукты: {products}")
    
    # Генерируем 10 записей (по 2 на продукт)
    for i in range(10):
        product_id = random.choice(products)
        campaign_id = random.randint(10000, 99999)
        date = (datetime.now() - timedelta(days=random.randint(1, 90))).strftime('%Y-%m-%d')
        
        # Реалистичные данные WB рекламы (низкий/средний бюджет)
        spend = round(random.uniform(500, 15000), 2)
        impressions = random.randint(1000, 50000)
        clicks = int(impressions * random.uniform(0.01, 0.05))  # CTR 1-5%
        orders = random.randint(max(1, clicks//20), clicks//5)
        ctr = round(clicks / impressions * 100, 2) if impressions > 0 else 0
        
        cur.execute('''
            INSERT INTO wb_ad_stats 
            (product_id, campaign_id, date, spend, impressions, clicks, orders, ctr, source_api)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (product_id, campaign_id, date, spend, impressions, clicks, orders, ctr, '/adv/v3/fullstats'))
    
    conn.commit()
    conn.close()
    print("✅ 10 записей добавлено в wb_ad_stats!")

if __name__ == "__main__":
    generate_ad_data()