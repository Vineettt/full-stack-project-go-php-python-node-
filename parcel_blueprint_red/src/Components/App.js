import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import AppProvider from './AppProvider';
import { AppContext } from './AppProvider.js';

import GoProvider from './GoProvider';
import { GoContext } from './GoProvider.js';

import PythonProvider from './PythonProvider';
import { PythonContext } from './PythonProvider.js';

import PHPProvider from './PHPProvider';
import { PHPContext } from './PHPProvider.js';

import { navigate, useRoutes } from 'hookrouter';

import { GS } from './GS.js';
import { Dashboard } from './Dashboard';
import { Cube } from './Cube';

const StyledApp = styled.div`
    position:relative;
    top:0px;
    left:0px;
    width:100%;
    height:100%;
    display:grid;
    background:#000;
    color:#ccc;
    grid-template-columns:6rem 1fr;
	transition: grid-template-columns .2s;
    &.sidebar-open{
        grid-template-columns:32rem 1fr;
    }

    #sidebar{
        position:relative;
        flex-direction:column;
        background:transparent;
        display:flex;
        #sidebar-bottom{
            display:flex;
            flex-direction:row-reverse;
            #sidebar-toggle{
                width:5.9rem;
                height:6.9rem;

                &:hover{cursor:pointer;}
            }
        }

        #sidebar-top{
            padding:1rem;
            .link:not(:first-child){
                margin-top:.5rem;
           
            }
            .link{ 
                font-size:1.2rem;   
             &:hover{cursor:pointer;}

            &.selected{
                color:#acf9fb;
            }}
            &.sidebar-close{
                width:0px;
                overflow:hidden;
                padding:0px;
                opacity:0;
            }
        }
    }
    #content{
        background:#000;
    }
`;

function App() {
    const routes = {
        '/': () => <Dashboard />,
        '/cube': () => <Cube />,
    }

    // useEffect(() => {
    //     if(window.location.pathname !== '/'){
    //         navigate('/');
    //     }
    // }, [])

    const routeResult = useRoutes(routes);

    return (
        <AppProvider>
            <AppContext.Consumer>
                {({ sidebar, setSidebar, path }) => (
                    <GoProvider>
                        <GoContext.Consumer>
                            {({ }) => (
                                <PythonProvider>
                                    <PythonContext.Consumer>
                                        {({ }) => (
                                            <PHPProvider>
                                                <PHPContext.Consumer>
                                                    {({ }) => (
                                                        <StyledApp className={sidebar ? 'sidebar-open' : 'sidebar-close'}>
                                                            <GS />
                                                            <div id="sidebar">
                                                                <div id="sidebar-top" className={sidebar ? 'sidebar-open' : 'sidebar-close'}>
                                                                    <div className={`link ${path === '/' ? 'selected' : ''}`} onClick={() => navigate('/')}>Dashboard</div>
                                                                    <div className={`link ${path === '/cube' ? 'selected' : ''}`} onClick={() => navigate('/cube')}>Cube</div>
                                                                </div>
                                                                <div className="flex-filter"></div>
                                                                <div id="sidebar-bottom">
                                                                    <img id="sidebar-toggle" src="/images/download.png" onClick={() => setSidebar(!sidebar)} />
                                                                </div>
                                                            </div>
                                                            <div id="content">
                                                                {routeResult}
                                                            </div>
                                                        </StyledApp>
                                                    )}
                                                </PHPContext.Consumer>
                                            </PHPProvider>
                                        )}
                                    </PythonContext.Consumer>
                                </PythonProvider>
                            )}
                        </GoContext.Consumer>
                    </GoProvider>
                )}
            </AppContext.Consumer>
        </AppProvider>
    )
}

if (document.querySelector('#react_root')) {
    ReactDOM.render(<App />, document.querySelector("#react_root"))
}