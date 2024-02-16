import { useState } from 'react';
import { useEffect} from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [countX, setCountX] = useState(0);
  const [countO, setCountO] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState(null);

  function handleClick(i) {
    const playerSymbol = xIsNext ? "X" : "O"; //determine piece to be placed
    const moves = xIsNext ? countX : countO;  //determine the move's count used for logic based on the turn
    
    // Allow selecting a piece for moving if the player has already placed 3 pieces
    if (moves >= 3 && squares[i] === playerSymbol && selectedSquare === null) {
      setSelectedSquare(i);
      return; // After selecting, exit the function to avoid placing a new piece or moving immediately
    }
  
    if (selectedSquare !== null && !calculateWinner(squares)){
      if (squares[i] || squares[selectedSquare] !== playerSymbol){ //if the target sqr is not empty or the selectedPiece is not theirs
        setSelectedSquare(null); //deselect the empty square
        return; //return early and do nothing
      }
      //using the functions to determine if the move is valid
      else if (isValidMoveDirection(selectedSquare, i) && vacateCenterOrWin(playerSymbol, squares, selectedSquare, i)){
        //move the piece to new empty position, delete where it was at
        const nextSquares = squares.slice();
        nextSquares[selectedSquare] = null;
        nextSquares[i] = playerSymbol;
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
        setSelectedSquare(null); // Deselect the piece after moving
        return;
      }
    }
    
    //if the square is not empty or there is already a winner
    if (squares[i] || calculateWinner(squares)){
      return;  //return early
    }
    //if the player at current turn has placed less than 3 pieces
    if (moves < 3){
      const nextSquares = squares.slice();
      nextSquares[i] = playerSymbol;
      setSquares(nextSquares);
      if (xIsNext){
        setCountX(countX + 1);
      } else {
        setCountO(countO + 1);
      }
      setXIsNext(!xIsNext);          
    }
  }

  function isValidMoveDirection(prevIndex, targetIndex) {
    const prevRow = Math.floor(prevIndex / 3);
    const prevCol = prevIndex % 3;
    const targetRow = Math.floor(targetIndex / 3);
    const targetCol = targetIndex % 3;
  
    const rowDiff = Math.abs(prevRow - targetRow);
    const colDiff = Math.abs(prevCol - targetCol);
  
    return rowDiff <= 1 && colDiff <= 1; // Allows adjacent moves including diagonals
  }

  function vacateCenterOrWin(playerSymbol, squares, selectedSquare, targetIndex){
    if (squares[4] === playerSymbol){ //if the player is occupying the middle square
      if (selectedSquare === 4 && targetIndex !== 4){
        return true; //move is valid if they are vacating the middle square
      }
      const potentialSquares = squares.slice();
      //simulate the move to check if it results on a win
      potentialSquares[selectedSquare] = null; 
      potentialSquares[targetIndex] = playerSymbol;
      if (calculateWinner(potentialSquares)){ //simulating the move
        return true;
      }
      return false; //move does not vacate the cente or does not result in a win
    }
    return true; //if the player is not occupying the middle square, all moves are valid
  }
  
  
  useEffect(() => {
    console.log("Selected Square:", selectedSquare);
    console.log("Squares:", squares);
  }, [selectedSquare, squares]); 

  const winner = calculateWinner(squares);
  let status;
  if (winner){
    status = "Winner: " + winner;
  } else {
    status = "Next Move: " + (xIsNext ? "X" : "O");
  }
  return(
    <>
      <div className='status'>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if( squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}