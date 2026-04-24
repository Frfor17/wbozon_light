from agents.agent_custdev_analyse import AgentCustdevAnalyse
from agents.agent_process_analysing import AgentProcessAnalysing
from agents.agent_strategy_of_promotion import AgentStrategyOfPromotion
from agents.agent_dialogue_analysing import AgentDialogueAnalysing
from agents.agent_decision_making import AgentDecisionMaking

agents = {
    "custdev": AgentCustdevAnalyse(),        # кастдевы
    "process": AgentProcessAnalysing(),      # анализ процессов
    "strategy": AgentStrategyOfPromotion(),  # стратегия продвижения
    "dialogue": AgentDialogueAnalysing(),    # диалоги
    "decision": AgentDecisionMaking(),       # принятие решений
}