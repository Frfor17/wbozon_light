from secrets import TOKENS, GROUP_ID
import asyncio
import logging
from aiogram import Bot, Dispatcher, F
from aiogram.filters import Command
from aiogram.types import Message

dp = Dispatcher()

@dp.message(Command("custdev"), F.chat.id == GROUP_ID)
async def custdev_handler(message: Message):
    await message.answer(
        "🔍 **CustDev Гайд:**\n"
        "• **Гипотеза:** Кто ЦА? Какие боли?\n"
        "• **Интервью:** 10-15 звонков/чатов\n"
        "• **Проблема:** 'Болит?' → да/нет?\n"
        "• **Решение:** 'Купил бы за 500р?'\n\n"
        "Метрика успеха: 40%+ готовы платить! 🚀"
    )

async def main():
    bot = Bot(token=TOKEN)
    logging.basicConfig(level=logging.INFO)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())