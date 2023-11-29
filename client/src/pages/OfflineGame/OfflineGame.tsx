import { useMemo, useState } from 'react';
import cls from './OfflineGame.module.scss';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import Engine from './Engine/Engine.ts';
import { Square } from 'react-chessboard/dist/chessboard/types';
import { Move } from '../../interfaces/ChessTypes/chess.ts';

const OfflineGame = () => {
    const levels = {
        'Легкий': 2,
        'Средний': 8,
    };
    const engine = useMemo(() => new Engine(), []);
    const [game, setGame] = useState(new Chess());
    //
    const [gamePosition, setGamePosition] = useState(game.fen());
    const [stockfishLevel, setStockfishLevel] = useState(2);
    const [moveFrom, setMoveFrom] = useState('');
    // Куда пошла фигура и сброс после хода до null
    const [moveTo, setMoveTo] = useState<Square | null>(null);
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [rightClickedSquares, setRightClickedSquares] = useState({});
    const [moveSquares, setMoveSquares] = useState({});
    const [optionSquares, setOptionSquares] = useState({});
    const [motion, setMotion] = useState(true);

    function safeGameMutate(modify: (game: any) => void) {
        setGame((g: typeof game) => {
            const update = { ...g };
            modify(update);
            modify(update);
            return update;
        });
    }

    // История ходов
    // .isDraw() - ничья
    // useEffect(() => {
    //     console.log(game.history());
    // }, [game.history()]);

    // Ход компьютера
    function findBestMove() {
        engine.evaluatePosition(game.fen(), stockfishLevel);

        engine.onMessage(({ bestMove }) => {
            if (bestMove) {
                game.move({
                    from: bestMove.substring(0, 2),
                    to: bestMove.substring(2, 4),
                    promotion: bestMove.substring(4, 5),
                });

                setGamePosition(game.fen());
            }
        });
    }

    function getMoveOptions(square: Square) {
        const moves = game.moves({
            square,
            verbose: true,
        });
        if (moves.length === 0) {
            setOptionSquares({});
            return false;
        }

        const newSquares: any = {};
        moves.map((move: Move) => {
            newSquares[move.to] = {
                background:
                    game.get(move.to) &&
                    game.get(move.to).color !== game.get(square).color
                        ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
                        : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
                borderRadius: '50%',
            };
            return move;
        });
        newSquares[square] = {
            background: 'rgba(255, 255, 0, 0.4)',
        };
        setOptionSquares(newSquares);
        return true;
    }

    function onSquareClick(square: Square) {
        if (game.game_over() || game.in_checkmate()) {
            window.alert('Game End!');
            game.reset();
        }
        setRightClickedSquares({});

        // Откуда пошла фигура
        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square);
            if (hasMoveOptions) setMoveFrom(square);
            return;
        }

        // Куда пойдет фигура
        if (!moveTo) {
            const moves: Move[] = game.moves({
                moveFrom,
                verbose: true,
            });
            const foundMove = moves.find(
                (m) => m.from === moveFrom && m.to === square,
            );

            if (!foundMove) {
                const hasMoveOptions = getMoveOptions(square);
                setMoveFrom(hasMoveOptions ? square : '');
                return;
            }

            setMoveTo(square);

            if (
                (foundMove.color === 'w' &&
                    foundMove.piece === 'p' &&
                    square[1] === '8') ||
                (foundMove.color === 'b' &&
                    foundMove.piece === 'p' &&
                    square[1] === '1')
            ) {
                setShowPromotionDialog(true);
                return;
            }

            const gameCopy = { ...game };
            const move = gameCopy.move({
                from: moveFrom,
                to: square,
                promotion: 'q',
            });

            if (move === null) {
                const hasMoveOptions = getMoveOptions(square);
                if (hasMoveOptions) setMoveFrom(square);
                return;
            }

            setGame(gameCopy);
            setMotion((prevState) => !prevState);
            setTimeout(findBestMove, 400);
            setMotion((prevState) => !prevState);
            setMoveFrom('');
            setMoveTo(null);
            setOptionSquares({});
            return;
        }
    }

    // TODO: показыать правильно чей сейчас ход

    return (
        <div className={cls.page}>
            <div className={cls.container}>
                <div className={cls.header}>

                    <div className={cls.level}>
                        {Object.entries(levels).map(([level, depth], index) => (
                            <button
                                key={index}
                                className={cls.btn}
                                style={{
                                    backgroundColor:
                                        depth === stockfishLevel
                                            ? '#626262'
                                            : '#f0d9b5',
                                }}
                                onClick={() => setStockfishLevel(depth)}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                    <h1>Ход: {motion ? 'Белых' : 'Черных'}</h1>
                </div>
                <Chessboard
                    id="ClickToMove"
                    animationDuration={200}
                    arePiecesDraggable={false}
                    position={game.fen()}
                    onSquareClick={onSquareClick}
                    customBoardStyle={{
                        borderRadius: '4px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                    }}
                    customDarkSquareStyle={{ backgroundColor: '#6f73d2' }}
                    customLightSquareStyle={{ backgroundColor: '#9dacff' }}
                    customSquareStyles={{
                        ...moveSquares,
                        ...optionSquares,
                        ...rightClickedSquares,
                    }}
                    promotionToSquare={moveTo}
                    showPromotionDialog={showPromotionDialog}
                />
                <div className={cls.wrapperActions}>
                    <button
                        className={cls.btn}
                        onClick={() => {
                            safeGameMutate((game) => {
                                game.reset();
                                setMotion(true);
                            });
                            setMoveSquares({});
                            setOptionSquares({});
                            setRightClickedSquares({});
                        }}
                    >
                        Начать заново
                    </button>
                    <button
                        className={cls.btn}
                        onClick={() => {
                            safeGameMutate((game) => {
                                game.undo();
                            });
                            setMoveSquares({});
                            setOptionSquares({});
                            setRightClickedSquares({});
                        }}
                    >
                        Отменить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfflineGame;
