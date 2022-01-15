import React, {useState, useEffect, useContext} from "react";
import styled from 'styled-components';

const StyledCubeRight = styled.div`
    transform: rotateY(90deg) translateZ(1000px) ;
`;

export function CubeRight(){
    return(
        <StyledCubeRight className="cube-face">
            Right
        </StyledCubeRight>
    )
}