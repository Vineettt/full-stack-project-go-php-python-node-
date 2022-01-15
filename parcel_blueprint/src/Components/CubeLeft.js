import React, {useState, useEffect, useContext} from "react";
import styled from 'styled-components';

const StyledCubeLeft = styled.div`
    transform: rotateY(-90deg) translateZ(1000px);
`;

export function CubeLeft(){
    return(
        <StyledCubeLeft className="cube-face">
            Left
        </StyledCubeLeft>
    )
}