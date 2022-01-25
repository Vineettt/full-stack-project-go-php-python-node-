import React, {useEffect, useState, createContext} from 'react';

export const PHPContext = createContext()
export default function(props){
    
    const request = async(type, data) => {
        let payload = {
            jwt:  null,
            type,
            data
        };
        ws.send(JSON.stringify(payload));
    }
    
    const [rs, setRs] = useState(0);
    const [ws, setWs] = useState(null);

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
                    case "test-response-from-php-server":
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
            request('php-client-test-msg', 'Hello php server from client.');
        }
    }

    useEffect(() => {
        if (ws == null) { setWs(new WebSocket("ws://localhost:1700")) }
        if (ws !== null && rs == 0) { configureWebSocket(); heartbeat(ws); }
    }, [ ws, rs]);


    return (
        <PHPContext.Provider value = {{
            rs
        }}>
        {props.children}
        </PHPContext.Provider>
    )
}