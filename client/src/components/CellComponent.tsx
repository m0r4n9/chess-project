import {FC} from 'react';
import {Cell} from "../models/Cell";

// import {Interface} from "readline";

interface CellProps {
    cell: Cell,
    selected: boolean;
    click: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    return (
        <div style={{background: cell.available && cell.figure ? 'green' : ''}} onClick={() => click(cell)}
             className={['cell',
                 cell.color, selected ? "selected" : ''].join(' ')}>
            {cell.available && !cell.figure && <div className={"available"}/>}
            {cell.figure?.logo &&
                <img
                    src={cell.figure.logo}
                    alt=""/>}
        </div>
    );
};

export default CellComponent;
