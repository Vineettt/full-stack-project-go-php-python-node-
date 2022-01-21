import React, {useEffect, useState, createContext} from 'react';

export const PHPContext = createContext()
export default function(props){

    
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
            }
            ws.onclose = function(close_event){
                console.log(close_event);
            }
            ws.onerror = function(error_event){
                console.log(error_event);

            }
        }
    }

    useEffect(() => {
        if (ws == null) { setWs(new WebSocket("ws://localhost:1701")) }
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