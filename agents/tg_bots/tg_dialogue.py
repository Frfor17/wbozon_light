from secrets import TOKENS, GROUP_ID
from secrets import TOKENS, GROUP_ID
import asyncio
import logging
from aiogram import Bot, Dispatcher, F
from aiogram.filters import Command
from aiogram.types import Message

dp = Dispatcher()

@dp.message(Command("dialogue"), F.chat.id == GROUP_ID)
async def custdev_handler(message: Message):
    await message.answer(
        "Пользователь сомневается, следует узнать и отработать возражения"
    )

async def main():
    bot = Bot(token=TOKEN)
    logging.basicConfig(level=logging.INFO)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())