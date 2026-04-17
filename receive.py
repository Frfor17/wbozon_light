from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# ✅ Модель для валидации JSON
class CardFlip(BaseModel):
    action: str
    card_id: str
    counter: int

@app.post("/api/card-flip")
async def flip_card(data: CardFlip):  # Автоматически парсит JSON!
    print(f"📱 От Flutter: {data}")
    # data = CardFlip(action='flip_card', card_id='123', counter=5)
    
    # Логика смены картинки
    print(f"🔄 Переворачиваем карточку {data.card_id} ({data.counter} раз)")
    
    # Сохраните в БД или измените картинку
    # await database.update_card(data.card_id, flipped=True)
    
    return {
        "success": True,
        "message": "Картинка перевернута!",
        "new_image": "back.jpg"
    }

# Тестовый GET
@app.get("/")
async def root():
    return {"message": "FastAPI работает!"}