import React, {useEffect, useState, createContext} from 'react';

export const PythonContext = createContext()
export default function(props){
    
    const [rs, setRs] = useState(0);
    const [ws, setWs] = useState(null);

    const request = async(type, data) => {
        let payload = {
            jwt:  null,
            type,
            data
        };
        ws.send(JSON.stringify(payload));
    }

    const heartbeat = async(ws) =>{
        setTimeout(function (){
            if(rs !== ws.readyState ){setRs(ws.readyState);}
            heartbeat(ws);
        }.bind(this), 1000);
    }

    const configureWebSocket = async() =>{
        ws.onopen = function(open_event){
            console.log(open_event);
            ws.onmessage = function(msg_event){
                console.log(msg_event);
                let tjo = JSON.parse(msg_event.data);
                switch(tjo['type']){
                    case "test-response-from-python-server":
                        console.log(tjo['data']);
                        break;
                    default:
                        break;
                }
            }
            ws.onclose = function(close_event){
                console.log(close_event);
            }
            ws.onerror = function(error_event){
                console.log(error_event);

            }
            request('python-client-test-msg', 'Hello python server from client.');
        }
    }

    useEffect(() => {
        if (ws == null) { setWs(new WebSocket("ws://localhost:1600")) }
        if (ws !== null && rs == 0) { configureWebSocket(); heartbeat(ws); }
    }, [ ws, rs]);


    return (
        <PythonContext.Provider value = {{
            rs
        }}>
        {props.children}
        </PythonContext.Provider>
    )
}