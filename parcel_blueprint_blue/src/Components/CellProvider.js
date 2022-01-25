import react, { useState, useEffect, createContext } from "react";

import { Go } from './Go';
import { Python } from './Python';
import { Node } from './Node';
import { PHP } from './PHP';


export const CellContext = createContext();

export default function (props) {
    const [one, setOne] = useState([]);
    const [two, setTwo] = useState([]);
    const [three, setThree] = useState([]);
    const [four, setFour] = useState([]);
    const [five, setFive] = useState([]);

    const [updateCell, setUpdateCell] = useState(null);
    const [updateToggle, setUpdateToggle] = useState(true);

    const returnCellComponents = (index) => {
        switch (index) {
            case 1:
                return one;
                break;
            case 2:
                return two;
                break;
            case 3:
                return three;
                break;
            case 4:
                return four;
                break;
            case 5:
                return five;
                break;
        }
    }

    return (
        <CellContext.Provider value={{
            one, setOne, two, setTwo, three, setThree, four, setFour, five, setFive, updateToggle, setUpdateToggle, updateCell, setUpdateCell, returnCellComponents
        }}>
            {props.children}
        </CellContext.Provider>
    )
}