import React, {useState, useEffect, useContext} from "react";
import styled from 'styled-components';

const StyledCubeBack = styled.div`
    transform: translateZ(-1000px) rotateY(-180deg);
`;

export function CubeBack(){
    return(
        <StyledCubeBack className="cube-face">
            Back
        </StyledCubeBack>
    )
}