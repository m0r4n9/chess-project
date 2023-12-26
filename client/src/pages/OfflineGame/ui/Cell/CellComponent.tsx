import { Cell } from '../../models/Cell';
import cls from './Cell.module.scss';

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}

const CellComponent = ({ cell, selected, click }: CellProps) => {
    return (
        <div
            style={{ background: cell.available && cell.figure ? 'green' : '' }}
            onClick={() => click(cell)}
            className={[
                cls.cell,
                cell.color,
                selected ? cls.selected : '',
            ].join(' ')}
        >
            {cell.available && !cell.figure && (
                <div className={cls.available} />
            )}
            {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
        </div>
    );
};

export default CellComponent;
