from secrets import TOKENS, GROUP_ID
from secrets import TOKENS, GROUP_ID
import asyncio
import logging
from aiogram import Bot, Dispatcher, F
from aiogram.filters import Command
from aiogram.types import Message
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

dp = Dispatcher()

@dp.message(Command("dialogue"))
async def custdev_handler(message: Message):
    await message.answer(
        "Собеседник сомневается, следует узнать и отработать возражения"
    )

async def main():
    bot = Bot(
        token=TOKENS[0]
    )
    logging.basicConfig(level=logging.INFO)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())