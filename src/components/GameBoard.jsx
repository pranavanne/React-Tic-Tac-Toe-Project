import {useState} from 'react';

const initialGameBoard = [[null,null,null],[null,null,null],[null,null,null]];

export default function GameBoard({onSelectSquare, activePlayerSymbol}) {

    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {   // prevGameBoard is the prev state automatially received by react.
            const updatedGameBoard = [...prevGameBoard.map((innerArray) => {return [...innerArray]})];
            updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedGameBoard;
        });

        onSelectSquare();
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => {
                return <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => { return <li key={colIndex}><button onClick={() => {handleSelectSquare(rowIndex, colIndex)}}>{playerSymbol}</button></li> })}
                    </ol>
                </li>
            })}
        </ol>
    );
}