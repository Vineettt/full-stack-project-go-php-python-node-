import asyncio
import json
import logging
import ssl

import websockets

import py_modz;

WEB_SOCKET_CLIENTS = set()

async def register(websocket):
    WEB_SOCKET_CLIENTS.add(websocket)

async def unregister(websocket):
    WEB_SOCKET_CLIENTS.remove(websocket)

async def send_ws_packet(websocket, type, data):
    wsPkt = {}
    wsPkt['type'] = type;
    wsPkt['data'] = data;
    json_data = json.dumps(wsPkt);
    await websocket.send(json_data);

async def consumer(websocket, path):
    try:
        async for message in websocket:
            tjo = json.loads(message)
            if tjo["type"] == "python-client-test-msg":
                await send_ws_packet(websocket,'test-response-from-python-server', 'Hello from python Server')
    except:
        print("Something went wrong")    
    finally: 
        if websocket in WEB_SOCKET_CLIENTS:
            await unregister(websocket)
        elif websocket.closed == True:
            del websocket
        else:
            py_modz.dump(websocket)

async def handler(websocket, path):
    await register(websocket)
    consumer_task = asyncio.ensure_future(consumer(websocket,path))
    done, pending = await asyncio.wait([consumer_task], return_when=asyncio.FIRST_COMPLETED)
    for task in pending:
        task.cancel()

server =websockets.serve(handler, "a0uth.local.com", 1600)

print("Python listening | 0.0.0.0:1600")

asyncio.get_event_loop().run_until_complete(server)
asyncio.get_event_loop().run_forever()






