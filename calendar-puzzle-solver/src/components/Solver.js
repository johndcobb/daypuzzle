import React, { useEffect, useState } from "react";
import Board from "./Board";
import DateInput from "./DateInput";
import { BoardUtility } from "./Utility";
import LoadingScreen from "./LoadingScreen";
import PiecesDrawer from "./PiecesDrawer";
function Solver({ piecesDrawerOpen = false, closeDrawerHandler = () => {} }) {
  const [solving, setSolving] = useState(false);
  const [solved, setSolved] = useState(false);
  const [board, setBoard] = useState(null);
  const [boardMatrix, setBoardMatrix] = useState([]);
  const [pieces, setPieces] = useState([]);
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  useEffect(() => {
    // whenever new month or day selected, update board to reflect
    // new month and day
    if (month || day) {
      const newBoard = new BoardUtility({
        month: month,
        day: day,
      });
      setPieces(newBoard.getPieces());
      setBoard(newBoard);
      setBoardMatrix(newBoard.getBoardMatrix());
    }
  }, [month, day]);

  if (board === null || solving) {
    return <LoadingScreen />;
  }
  return (
    // display a date input asking for month and day (not year)
    // display a button to solve the puzzle
    <div>
      <DateInput
        currentMonth={month}
        currentDay={day}
        solveClickHandler={() => {
          setSolved(false);
          setSolving(true);
          setTimeout(() => {
            let response = board.solve();
            if (response === true) {
              // display the solved board
              console.log("board solved");
              setBoardMatrix(board.getBoardMatrix());
              setSolved(true);
            }
            setSolving(false);
          }, [1000]);
        }}
        changeDayHandler={(e) => {
          setSolved(false);
          setDay(e.target.value);
        }}
        changeMonthHandler={(e) => {
          setSolved(false);
          setMonth(e.target.value);
        }}
      />
      <div className="board-container" id="solver">
        <Board board={boardMatrix} />
      </div>
      {solved && (
        <div style={{ textAlign: "center" }}>
          <h2>SOLVED! Attempted {board.getAttemptedStates()} board states</h2>
        </div>
      )}

      <PiecesDrawer
        pieces={pieces}
        open={piecesDrawerOpen}
        closeDrawerHandler={closeDrawerHandler}
      />
    </div>
  );
}

export default Solver;
