# В конец твоего main.py
from multitabe import WBQueryTool  # Импорт твоего класса
import pandas as pd
from fastapi.responses import JSONResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from multitabe import WBQueryTool
import pandas as pd

tool = WBQueryTool("mydb.db")  # Твоя БД

app = FastAPI(title="MultiTable API")

# CORS для React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React порт
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/api/multi-table-data")
async def get_multi_table_data():
    sql = """
    SELECT 
        p.id as product_id,
        p.nm_id,
        COALESCE(p.wb_product_name, 'Без названия') as wb_product_name,
        COALESCE(b.brand_name, 'WB Маркет') as brand_name,
        COALESCE(c.name, 'Категория #' || p.category_id) as category_name,
        COALESCE(s.vendor_name, 'Поставщик') as supplier_name,
        COALESCE(SUM(st.stock), 0) as total_stock,
        ROUND(AVG(COALESCE(st.price, 0)), 0) as avg_price,
        COALESCE(SUM(oi.quantity), 0) as total_orders,
        0 as total_revenue
        -- УБРАЛИ first_image (NaN проблема)
    FROM wb_products p
    JOIN wb_categories c ON p.category_id = c.id
    LEFT JOIN wb_brands b ON p.brand_id = b.id
    LEFT JOIN wb_suppliers s ON p.supplier_id = s.id
    LEFT JOIN wb_stocks st ON p.id = st.product_id
    LEFT JOIN wb_order_items oi ON p.id = oi.product_id
    GROUP BY p.id, p.nm_id, p.wb_product_name, c.id, c.name
    ORDER BY total_stock DESC, nm_id
    LIMIT 20
    """
    
    df = tool.multi_query(sql)
    
    # 🔥 ФИКС NaN для JSON
    df = df.fillna(0).replace([float('inf'), -float('inf')], 0)
    
    print(f"🟢 Вернул {len(df)} записей")
    return df.to_dict('records')
    
# uvicorn multitable_queries:app --reload --host 0.0.0.0 --port 8001