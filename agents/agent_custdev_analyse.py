# agents/agent_custdev_analyse.py

import asyncio
from typing import Dict, Any

class AgentCustdevAnalyse:
    async def run(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Примерная логика:
          - из контекста забираем данные от клиента (сообщения, отчёты, запросы)
          - делаем анализ по типу гипотезы, сегменты, проблемы, pain points
          - кладём результат обратно в context
        """
        # 1. Достаём данные из контекста
        raw_input = context.get("input", "")
        history = context.get("messages", [])
        project_data = context.get("project", {})

        # 2. Простейший «анализ» (здесь позже можно вставить LLM‑шаг)
        #     Сейчас просто симулируем вывод
        custdev_insights = {
            "assumptions": [
                "Пользователь хочет дешевую, но быструю validates‑гипотезу",
                "Сомневается, нужен ли Telegram‑бот или API‑сервис",
            ],
            "pains": [
                "Много времени тратится на ручную координацию",
                "Не уверен, как правильно выстроить граф агентов",
            ],
            "suggetions": [
                "Сделать CustDev-анализ более итеративным",
                "Связать анализ с реальными сценариями использования",
            ],
        }

        # 3. Делаем имитацию async‑запроса к LLM (пока просто sleep)
        await asyncio.sleep(0.1)  # заглушка вместо реального LLM

        # 4. Обновляем контекст
        result = {
            **context,
            "agent_custdev_result": {
                "phase": "custdev_analysis",
                "insights": custdev_insights,
            },
            "latest_agent": "custdev",
        }

        return result