import sqlite3
import pandas as pd
from typing import List, Dict, Any, Optional

class WBQueryTool:
    def __init__(self, db_path: str = "mydb.db"):
        self.db_path = db_path
        self.conn = sqlite3.connect(db_path)
        self.conn.execute("PRAGMA foreign_keys = ON")
    
    def multi_query(self, sql: str, params: Optional[List] = None) -> pd.DataFrame:
        """Выполняет любой SQL с JOIN, возвращает DataFrame."""
        df = pd.read_sql_query(sql, self.conn, params=params)
        return df
    
    def close(self):
        self.conn.close()

# Примеры использования
if __name__ == "__main__":
    tool = WBQueryTool("mydb.db")
    
    # Пример 1: Товары + остатки + бренды (JOIN 3 таблицы)
    sql1 = """
    SELECT 
        p.wb_product_name, b.brand_name, s.stock, s.price,
        s.warehouse, s.region
    FROM wb_products p
    JOIN wb_brands b ON p.brand_id = b.id
    LEFT JOIN wb_stocks s ON p.id = s.product_id
    WHERE s.stock > 0
    """
    df1 = tool.multi_query(sql1)
    print("Товары со складов:", df1.head())
    
    # Пример 2: Заказы + товары + размеры (с параметрами)
    sql2 = """
    SELECT o.order_date, p.wb_product_name, sz.size_name, oi.quantity, oi.price
    FROM wb_orders o
    JOIN wb_order_items oi ON o.id = oi.order_id
    JOIN wb_products p ON oi.product_id = p.id
    LEFT JOIN wb_sizes sz ON oi.size_id = sz.id
    WHERE o.order_date > ?
    ORDER BY o.order_date DESC
    """
    df2 = tool.multi_query(sql2, ["2026-01-01"])
    print("Последние заказы:", df2.head())
    
    # Пример 3: Анализ рекламы + финансы (агрегация)
    sql3 = """
    SELECT 
        strftime('%Y-%m', f.settlement_date) AS period,
        SUM(f.amount) AS revenue,
        SUM(a.spend) AS ad_spend,
        AVG(a.ctr) AS avg_ctr
    FROM wb_finance f
    LEFT JOIN wb_ad_stats a ON f.product_id = a.product_id
    GROUP BY period
    """
    df3 = tool.multi_query(sql3)
    print("Реклама vs выручка:", df3)
    
    tool.close()