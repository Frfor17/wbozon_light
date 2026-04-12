import asyncio
import logging
import requests
import json

from aiogram import Bot, Dispatcher, Router, F
from aiogram.types import Message
from secret import BOT_TOKEN, ADSGRAM_URL, TGID, BLOCKID, LANGUAGE, TOKEN

logging.basicConfig(level=logging.INFO)

router = Router()

# вывод текста
@router.message(F.text == "/ad")
async def ad_handler(message: Message):
    with open("ad_cache.json", "r", encoding="utf-8") as f:
        ad = json.load(f)

    text_html = ad["text_html"]
    await message.answer(text_html, parse_mode="HTML")

# ловля входящих сообщений и вывод его(чтобы знать, если ты написал и короче ну бесполезно, просто знать что ты пишешь)
@router.message()
async def echo(message: Message):
    await message.answer(f"Получил: {message.text}")

# попытка вывести полный рекламный блок
@router.message(F.text == "/ad_full")
async def ad_handler(message: Message):
    try:
        params = {
            "tgid": str(TGID).strip(),
            "blockid": str(BLOCKID).strip(),
            "language": LANGUAGE.strip(),
            "token": TOKEN.strip(),
        }

        response = requests.get(ADSGRAM_URL, params=params, timeout=10)
        print("STATUS:", response.status_code)
        print("BODY:", response.text)

        response.raise_for_status()
        ad = response.json()
        text_html = ad["text_html"].replace("\\u003c", "<").replace("\\u003e", ">")

        await message.answer(text_html, parse_mode="HTML")

    except Exception as e:
        print("ERROR:", repr(e))
        await message.answer(f"Ошибка: <code>{e}</code>", parse_mode="HTML")

async def main():
    bot = Bot(token=BOT_TOKEN)
    dp = Dispatcher()
    dp.include_router(router)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())