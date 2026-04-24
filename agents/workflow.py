# workflow.py

from langchain_core.runnables import RunnableLambda
from langgraph.graph import StateGraph
from agents.pool import agents

def execute_agent_node(state: dict) -> dict:
    agent_name = state["next_agent"]  # или другой ключ
    agent = agents[agent_name]
    result = await agent.run(state["context"])
    return {"output": result, "context": result}

# Создаём граф (or DAG)
workflow = StateGraph()
workflow.add_node("execute_agent", execute_agent_node)
workflow.add_edge("start", "execute_agent")

# (Опционально) export готовый Workflow
if __name__ == "__main__":
    print("Workflow initialized")