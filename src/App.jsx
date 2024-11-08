import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import {useState} from 'react';
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [[null,null,null],[null,null,null],[null,null,null]];

const PLAYERS = {X: 'Player 1', O: 'Player 2'};

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveWinner(players, gameBoard) {

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((innerArray) => {return [...innerArray]})];

  for (const turn of gameTurns) {
    const { player, square } = turn;
    gameBoard[square.row][square.col] = player
  }

  return gameBoard;
}

function App() {

  const [players, setPlayers]= useState(PLAYERS);
  // lifted gameboard state up for log.
  const [gameTurns, setGameTurns] = useState([]);

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {...prevPlayers, [symbol]: newName};
    })
  }
  
  function restartGame() {
    setGameTurns([]);
  }


  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(players, gameBoard);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = deriveActivePlayer(prevGameTurns);
      const updatedGameTurns = [{player: currentPlayer, square:{row: rowIndex, col: colIndex}},...prevGameTurns];
      return updatedGameTurns;
    })
  }
  const currentPlayer = deriveActivePlayer(gameTurns);

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={currentPlayer === 'X'} onNameChange={handlePlayerNameChange}></Player>
          <Player name={PLAYERS.O} symbol="O" isActive={currentPlayer === 'O'} onNameChange={handlePlayerNameChange}></Player>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} handleRestart={restartGame}></GameOver>}
        <GameBoard onSelectSquare={handleSelectSquare} gameData={gameBoard}/>
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  )
}

export default App
