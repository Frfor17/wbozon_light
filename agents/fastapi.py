from fastapi import FastAPI
from workflow import workflow  # импорт графа

app = FastAPI()

@app.post("/run_graph")
async def run_graph(data: dict):
    state = {"context": data, "next_agent": "custdev"}  # например
    result = await workflow.invoke(state)
    return result