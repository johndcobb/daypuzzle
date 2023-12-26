import React, { useEffect, useState } from "react";
import Board from "./Board";
import Piece from "./Piece";
import DateInput from "./DateInput";
function Solver() {
  const [attemptedStateCount, setAttemptedStateCount] = useState(0);
  const [board, setBoard] = useState(null);
  const [pieces, setPieces] = useState([]);
  const [month, setMonth] = useState(12);
  const [day, setDay] = useState(22);

  var BACKEND_BOARD = [];
  var BOARD_SIZE = [7, 7];

  const solvePuzzle = ({ pieces = [] }) => {
    console.log("solvePuzzle called");
    console.log("BACKEND_BOARD");
    console.log(BACKEND_BOARD);
    if (pieces.length == 0) return true;
    const piece = pieces[0];
    const orientations = generatePieceOrientations({ piece: piece.piece });
    console.log(
      `trying ${orientations.length} orientations of piece ${piece.name}`
    );
    for (let i = 0; i < orientations.length; i++) {
      const orientation = orientations[i];
      const placements = getAllowedPlacementsOfPieceOrientation(orientation);
      for (let j = 0; j < placements.length; j++) {
        const placement = placements[j];
        if (fits(orientation, placement)) {
          console.log("fits. placing.");
          place(piece, orientation, placement);
          const newPieces = pieces.slice(1);
          if (solvePuzzle({ pieces: newPieces })) {
            return true;
          } else {
            unplace(piece, orientation, placement);
          }
        }
      }
    }
    return false;
  };

  const generatePieceOrientations = ({ piece = [] }) => {
    // piece is a matrix representing a piece. generate all orientations of
    // the piece and return them as a list of matrices

    let orientations = [];
    orientations.push(piece);
    orientations.push(rotate90(piece));
    orientations.push(rotate90(rotate90(piece)));
    orientations.push(rotate90(rotate90(rotate90(piece))));
    orientations.push(fliplr(piece));
    orientations.push(rotate90(fliplr(piece)));
    orientations.push(rotate90(rotate90(fliplr(piece))));
    orientations.push(rotate90(rotate90(rotate90(fliplr(piece)))));
    // only return list of unique orientations
    const uniqueOrientations = [];
    orientations.forEach((orientation) => {
      if (!uniqueOrientations.some((o) => arraysEqual(o, orientation))) {
        uniqueOrientations.push(orientation);
      }
    });
    return uniqueOrientations;
  };

  useEffect(() => {
    // whenever new month or day selected, update board to reflect
    // new month and day
    if (month || day) {
      const newBoard = [
        [1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 0, 0],
      ];
      const [monthIndex, dayIndex] = getBoardIndexOfDate(month, day);
      newBoard[dayIndex[0]][dayIndex[1]] = 0;
      newBoard[monthIndex[0]][monthIndex[1]] = 0;
      setBoard(newBoard);
      BACKEND_BOARD = newBoard;
    }
  }, [month, day]);

  useEffect(() => {
    const board = [
      [1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 0, 0],
    ];
    const [monthIndex, dayIndex] = getBoardIndexOfDate(month, day);
    const bCopy = board.map((row) => [...row]);
    bCopy[dayIndex[0]][dayIndex[1]] = 0;
    bCopy[monthIndex[0]][monthIndex[1]] = 0;
    setBoard(bCopy);
    BACKEND_BOARD = bCopy;

    const pieceArray = [
      {
        piece: [
          [1, 1, 1],
          [1, 0, 0],
        ],
        name: "L",
      },
      {
        piece: [
          [0, 0, 1],
          [1, 1, 1],
          [1, 0, 0],
        ],
        name: "Z",
      },
      {
        piece: [
          [1, 1],
          [1, 1],
        ],
        name: "O",
      },
      {
        piece: [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0],
        ],
        name: "X",
      },
      {
        piece: [
          [1, 0, 1],
          [1, 1, 1],
        ],
        name: "U",
      },
      {
        piece: [
          [1, 1, 1],
          [1, 1, 0],
        ],
        name: "P",
      },
      {
        piece: [
          [0, 1, 1],
          [1, 1, 0],
        ],
        name: "S",
      },
      {
        piece: [
          [1, 1, 1],
          [0, 1, 0],
        ],
        name: "T",
      },
      {
        piece: [
          [1, 1, 1, 1],
          [0, 0, 0, 1],
        ],
        name: "L2",
      },
    ];
    setPieces(pieceArray);
  }, []);

  const fits = async (orientation, placement) => {
    setAttemptedStateCount(attemptedStateCount + 1);
    const pieceWidth = orientation.length;
    const pieceHeight = orientation[0].length;
    const xPlace = placement[0];
    const yPlace = placement[1];

    for (let x = 0; x < pieceWidth; x++) {
      for (let y = 0; y < pieceHeight; y++) {
        if (
          orientation[x][y] === 1 &&
          BACKEND_BOARD[xPlace + x][yPlace + y] !== 1
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const rotate90 = (piece) => {
    // Rotate a matrix 90 degrees clockwise (return a new matrix)
    // https://stackoverflow.com/questions/42519/how-do-you-rotate-a-two-dimensional-array
    return piece[0].map((val, index) =>
      piece.map((row) => row[index]).reverse()
    );
  };

  const fliplr = (piece) => {
    // Flip a matrix from left to right (return a new matrix)
    // https://stackoverflow.com/questions/784929/what-is-the-best-way-to-reverse-an-array-in-javascript
    return piece.map((row) => row.reverse());
  };

  const arraysEqual = (a, b) => {
    // Implement a function to check if two 2D arrays are equal
    // https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const place = async (piece, orientation, placement, unplace = false) => {
    console.log(`placing piece ${piece.name}`);
    const pieceWidth = orientation.length;
    const pieceHeight = orientation[0].length;
    const xPlace = placement[0];
    const yPlace = placement[1];
    // copy current board
    const boardCopy = BACKEND_BOARD.map((row) => [...row]);
    for (let x = 0; x < pieceWidth; x++) {
      for (let y = 0; y < pieceHeight; y++) {
        if (orientation[x][y] === 1) {
          boardCopy[xPlace + x][yPlace + y] = unplace ? 1 : piece.name;
        }
      }
    }
    // update backendboard to new value
    BACKEND_BOARD = boardCopy;
  };

  const getAllowedPlacementsOfPieceOrientation = (orientation) => {
    const placements = [];
    const pieceWidth = orientation.length;
    const pieceHeight = orientation[0].length;
    for (let row = 0; row < BOARD_SIZE[0] - pieceWidth + 1; row++) {
      for (let col = 0; col < BOARD_SIZE[1] - pieceHeight + 1; col++) {
        placements.push([row, col]);
      }
    }
    return placements;
  };

  const unplace = async (piece, orientation, placement) => {
    place(piece, orientation, placement, true);
  };
  const getBoardIndexOfDate = (month = 12, day = 22) => {
    let monthIndices = {
      1: [0, 0],
      2: [0, 1],
      3: [0, 2],
      4: [0, 3],
      5: [0, 4],
      6: [0, 5],
      7: [1, 0],
      8: [1, 1],
      9: [1, 2],
      10: [1, 3],
      11: [1, 4],
      12: [1, 5],
    };
    let dayIndices = {
      1: [2, 0],
      2: [2, 1],
      3: [2, 2],
      4: [2, 3],
      5: [2, 4],
      6: [2, 5],
      7: [2, 6],
      8: [3, 0],
      9: [3, 1],
      10: [3, 2],
      11: [3, 3],
      12: [3, 4],
      13: [3, 5],
      14: [3, 6],
      15: [4, 0],
      16: [4, 1],
      17: [4, 2],
      18: [4, 3],
      19: [4, 4],
      20: [4, 5],
      21: [4, 6],
      22: [5, 0],
      23: [5, 1],
      24: [5, 2],
      25: [5, 3],
      26: [5, 4],
      27: [5, 5],
      28: [5, 6],
      29: [6, 2],
      30: [6, 3],
      31: [6, 4],
    };
    return [monthIndices[month], dayIndices[day]];
  };
  if (!board || board.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    // display a date input asking for month and day (not year)
    // display a button to solve the puzzle
    <div>
      <DateInput
        currentMonth={month}
        currentDay={day}
        solveClickHandler={async () => {
          console.log("solve button clicked... solving puzzle");
          setAttemptedStateCount(0);
          let response = solvePuzzle({ pieces: pieces });
          console.log("solvePuzzle returned");
          console.log(response);
          console.log("attemptedStateCount");
          console.log(attemptedStateCount);
        }}
        changeDayHandler={(e) => setDay(e.target.value)}
        changeMonthHandler={(e) => setMonth(e.target.value)}
      />
      <div className="board-container" id="solver">
        <Board board={board} />
      </div>
      <h2 style={{ textAlign: "center" }}>
        Your named puzzle pieces are below
      </h2>
      <div className="pieces-container">
        {pieces.map((piece) => {
          return (
            <Piece
              key={piece.name}
              piece={piece.piece}
              name={piece.name}
              orientations={generatePieceOrientations({ piece: piece.piece })}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Solver;
