
import React,  {useState, useEffect, useContext} from "react";
import styled from 'styled-components';

import { GoContext } from './GoProvider';


const StyledGo = styled.div`
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

export function Go(){
    const {rs} = useContext(GoContext);

    return (
        <StyledGo>
            <span className="cell-language-title">{`Go WebSocket State - (${rs})`}</span>
        </StyledGo>
    )
}