from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ChangeImageRequest(BaseModel):
    test: bool

@app.post("/api/change-image")
async def change_image(data: ChangeImageRequest):
    # Здесь логика смены картинки
    print(f"Получен запрос: {data.test}")
    return {"status": "success", "message": "Картинка изменена"}