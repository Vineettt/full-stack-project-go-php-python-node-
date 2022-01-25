
import React,  {useState, useEffect, useContext} from "react";
import styled from 'styled-components';

import { AppContext } from './AppProvider.js';

const StyledNode = styled.div`
    position: relative;
    top:0px;
    left:0px;
    height: calc(100% - 6rem);
    border: 1px solid #f00;

    .cell-language-title{
        position: relative;
        color: #ccc;
        font-size: 1.6rem;
        text-align:center;
        width:100%;
        display: block;

    }
`;

export function Node(){
    const {rs} = useContext(AppContext);

    return (
        <StyledNode>
            <span className="cell-language-title">{`NodeJs WebSocket State - (${rs})`}</span>
        </StyledNode>
    )
}