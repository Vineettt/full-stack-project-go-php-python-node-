import React,  {useState, useEffect, useContext} from "react";
import styled from 'styled-components';

import { AppContext } from './AppProvider.js';
import { CellContext} from './CellProvider.js';

const StyledHaloCell = styled.div`
  background: hsla(199,100%,29%,.2);
  border:1px solid #000;
  width: calc(100% - 1rem);
  height: calc(100% - 1rem);

  margin-top: .5rem;
  margin-left: .5rem;



`;

export function HaloCell({index}){
    return (<StyledHaloCell>
        Halo Cell...
    </StyledHaloCell>)
}
