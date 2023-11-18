import { useMemo, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import Engine from './Engine/Engine.ts';

const buttonStyle = {
    cursor: 'pointer',
    padding: '10px 20px',
    margin: '10px 10px 0px 0px',
    borderRadius: '6px',
    backgroundColor: '#f0d9b5',
    border: 'none',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
};

const boardWrapper = {
    width: `70vw`,
    maxWidth: '70vh',
    margin: '3rem auto',
};

const OfflineGame = () => {
    const levels = {
        'Easy 🤓': 2,
        'Medium 🧐': 8,
        'Hard 😵': 18,
    };
    const engine = useMemo(() => new Engine(), []);
    const [game, setGame] = useState(new Chess());

    const [gamePosition, setGamePosition] = useState(game.fen());
    const [stockfishLevel, setStockfishLevel] = useState(2);

    const pieces = [
        'wP',
        'wN',
        'wB',
        'wR',
        'wQ',
        'wK',
        'bP',
        'bN',
        'bB',
        'bR',
        'bQ',
        'bK',
    ];

    // const customPieces = useMemo(() => {
    //     const pieceComponents: any = {};
    //     pieces.forEach((piece) => {
    //         pieceComponents[piece] = ({
    //             squareWidth,
    //         }: {
    //             squareWidth: any;
    //         }) => {
    //
    //           return (
    //             <div
    //               style={{
    //                 width: `${squareWidth}px`,
    //                 height: squareWidth,
    //                 backgroundImage: `url("./assets/black/bP.png")`,
    //                 backgroundSize: '100%',
    //               }}
    //             />
    //           );
    //         }
    //     });
    //     return pieceComponents;
    // }, [pieces]);



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

    function onDrop(sourceSquare: any, targetSquare: any, piece: any) {
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: piece[1].toLowerCase() ?? 'q',
        });
        setGamePosition(game.fen());

        // illegal move
        if (move === null) return false;

        // exit if the game is over
        if (game.game_over() || game.in_draw()) return false;

        findBestMove();

        return true;
    }

    return (
        <div style={boardWrapper}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                }}
            >
                {Object.entries(levels).map(([level, depth]) => (
                    <button
                        style={{
                            ...buttonStyle,
                            backgroundColor:
                                depth === stockfishLevel
                                    ? '#B58863'
                                    : '#f0d9b5',
                        }}
                        onClick={() => setStockfishLevel(depth)}
                    >
                        {level}
                    </button>
                ))}
            </div>

            <Chessboard
                id="PlayVsStockfish"
                customDarkSquareStyle={{ backgroundColor: '#b25ae0' }}
                customLightSquareStyle={{
                    backgroundColor: 'rgba(192,16,16,0.48)',
                }}
                customBoardStyle={{
                    borderRadius: '4px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                }}
                // customPieces={customPieces}
                position={gamePosition}
                onPieceDrop={onDrop}
            />

            <button
                style={buttonStyle}
                onClick={() => {
                    game.reset();
                    setGamePosition(game.fen());
                }}
            >
                New game
            </button>
            <button
                style={buttonStyle}
                onClick={() => {
                    game.undo();
                    game.undo();
                    setGamePosition(game.fen());
                }}
            >
                Undo
            </button>
        </div>
    );
};

export default OfflineGame;
