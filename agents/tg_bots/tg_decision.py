from secrets import TOKENS, GROUP_ID
from secrets import TOKENS, GROUP_ID
import asyncio
import logging
from aiogram import Bot, Dispatcher, F
from aiogram.filters import Command
from aiogram.types import Message

dp = Dispatcher()
# , F.chat.id == GROUP_ID
@dp.message(Command("decision"))
async def custdev_handler(message: Message):
    await message.answer(
        "Исходя из данных по конвертации лидов из тг чатов, принято решение остановить эту деятельность на время"
    )

async def main():
    bot = Bot(token=TOKENS[1])
    logging.basicConfig(level=logging.INFO)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())