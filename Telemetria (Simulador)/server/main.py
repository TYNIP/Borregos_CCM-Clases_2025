from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

import random, asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.websocket("/ws")
async def websocket_connection(ws:WebSocket):
    await ws.accept()

    try:
        while True:
            temp=round(random.uniform(800,5425),2)
            pressure=round(random.uniform(1, 1.5),2)
            status= "normal" if temp < 28 else "Alert"

            data = {
                "temperature":temp,
                "pressure": pressure,
                "status": status
            }

            await ws.send_json(data)
            await asyncio.sleep(1)

    except Exception as e:
        print("User disconnected", e)