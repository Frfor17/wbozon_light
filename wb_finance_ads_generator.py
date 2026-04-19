import sqlite3
import random
from datetime import datetime, timedelta

db_path = "mydb.db"

def generate_finance_data():
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    # Получаем существующие product_id из wb_ad_stats
    cur.execute("SELECT DISTINCT product_id FROM wb_ad_stats")
    products = [row[0] for row in cur.fetchall()]
    
    if not products:
        print("⚠️ Нет продуктов в wb_ad_stats! Запустите сначала генерацию рекламы.")
        return
    
    print(f"💰 Используем продукты: {products}")
    
    # Генерируем 10 записей финансов
    for i in range(10):
        product_id = random.choice(products)
        
        # Даты рядом с рекламой (±7 дней)
        base_date = datetime.now() - timedelta(days=random.randint(1, 90))
        settlement_date = (base_date + timedelta(days=random.randint(-7, 7))).strftime('%Y-%m-%d')
        
        # Связываем с рекламой: выручка ~ 5-15x от spend
        ad_spend = cur.execute(
            "SELECT spend FROM wb_ad_stats WHERE product_id = ? AND date <= ? ORDER BY date DESC LIMIT 1", 
            (product_id, settlement_date)
        ).fetchone()
        
        base_amount = ad_spend[0] * random.uniform(5, 15) if ad_spend else random.uniform(5000, 50000)
        amount = round(base_amount, 2)  # Выручка
        
        # Реалистичные комиссии WB (легкая промышленность ~20-30%)
        commission = round(amount * random.uniform(0.20, 0.35), 2)
        storage_fee = round(random.uniform(50, 500), 2)
        other_fee = round(amount * random.uniform(0.02, 0.05), 2)  # эквайринг+прочее
        vat = round((commission + other_fee) * 0.20, 2)
        
        cur.execute('''
            INSERT INTO wb_finance 
            (settlement_date, product_id, amount, vat, commission, storage_fee, other_fee, source_report)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (settlement_date, product_id, amount, vat, commission, storage_fee, other_fee, 'reportDetailByPeriod'))
    
    conn.commit()
    conn.close()
    print("✅ 10 записей добавлено в wb_finance!")

if __name__ == "__main__":
    generate_finance_data()