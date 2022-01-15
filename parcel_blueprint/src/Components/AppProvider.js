import React, {useEffect, useState, createContext} from 'react';
import {usePath} from 'hookrouter';

export const AppContext = createContext()
export default function(props){
    const path = usePath();
    const [route,setRoute] = useState('dashboard');
    const [sidebar, setSidebar] = useState(true);

    useEffect(()=>{
        console.log(path);
    }, [path])

    return (
        <AppContext.Provider value = {{
            sidebar,
            setSidebar,
            path
        }}>
        {props.children}
        </AppContext.Provider>
    )
}