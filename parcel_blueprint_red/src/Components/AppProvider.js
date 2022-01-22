import React, { useEffect, useState, createContext } from 'react';
import { usePath } from 'hookrouter';

export const AppContext = createContext()
export default function (props) {
    const path = usePath();
    const [route, setRoute] = useState('dashboard');
    const [sidebar, setSidebar] = useState(true);

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
                console.log(tjo);
                switch(tjo['type']){
                    case "test-response-from-node-server":
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
            request('node-client-test-msg', 'Hello node server from client.');

        }
    }

    useEffect(() => {
        if (ws == null) { setWs(new WebSocket("ws://localhost:1300/ws")) }
        if (ws !== null && rs == 0) { configureWebSocket(); heartbeat(ws); }
    }, [ ws, rs]);


    useEffect(() => {
        console.log(path);
    }, [path])

    return (
        <AppContext.Provider value={{
            sidebar,
            setSidebar,
            path,
            rs
        }}>
            {props.children}
        </AppContext.Provider>
    )
}