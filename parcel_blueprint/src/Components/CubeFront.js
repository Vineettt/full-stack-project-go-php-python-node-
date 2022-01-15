import React, {useState, useEffect, useContext} from "react";
import styled from 'styled-components';

const StyledCubeFront = styled.div`
    transform: translateZ(1000px) rotateY(0deg);
`;

export function CubeFront(){
    return(
        <StyledCubeFront className="cube-face">
            Front
        </StyledCubeFront>
    )
}