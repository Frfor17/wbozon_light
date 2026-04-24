from secrets import TOKENS, GROUP_ID
import asyncio
import logging

from aiogram import Bot, Dispatcher, F
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import Command
from aiogram.types import Message

dp = Dispatcher()
# , F.chat.id == GROUP_ID

@dp.message(Command("custdev"))
async def custdev_handler(message: Message):
    await message.answer(
        "✅ <b>CustDev пройден</b>\n"
        "Пользовательские боли и гипотезы подтверждены.\n\n"
        "🛠 <b>Планируемая фича:</b>\n"
        "Добавить [название фичи] для решения основной проблемы.\n\n"
        "📌 <b>Следующий шаг:</b>\n"
        "Собрать обратную связь и проверить спрос."
    )


async def main():
    bot = Bot(
        token=TOKENS[0],
        default=DefaultBotProperties(parse_mode=ParseMode.HTML),
    )
    logging.basicConfig(level=logging.INFO)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())