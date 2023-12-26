import React, { useEffect } from "react";
import "./index.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PieceCell from "./PieceCell";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const getFriendlyNameFromBoardCoords = (x = 0, y = 0) => {
  let monthCoordsToName = {
    "0,0": "Jan",
    "0,1": "Feb",
    "0,2": "Mar",
    "0,3": "Apr",
    "0,4": "May",
    "0,5": "Jun",
    "1,0": "Jul",
    "1,1": "Aug",
    "1,2": "Sep",
    "1,3": "Oct",
    "1,4": "Nov",
    "1,5": "Dec",
  };

  let dayCoordsToName = {
    "2,0": "1",
    "2,1": "2",
    "2,2": "3",
    "2,3": "4",
    "2,4": "5",
    "2,5": "6",
    "2,6": "7",
    "3,0": "8",
    "3,1": "9",
    "3,2": "10",
    "3,3": "11",
    "3,4": "12",
    "3,5": "13",
    "3,6": "14",
    "4,0": "15",
    "4,1": "16",
    "4,2": "17",
    "4,3": "18",
    "4,4": "19",
    "4,5": "20",
    "4,6": "21",
    "5,0": "22",
    "5,1": "23",
    "5,2": "24",
    "5,3": "25",
    "5,4": "26",
    "5,5": "27",
    "5,6": "28",
    "6,2": "29",
    "6,3": "30",
    "6,4": "31",
  };

  if (monthCoordsToName[`${x},${y}`]) {
    return monthCoordsToName[`${x},${y}`];
  } else if (dayCoordsToName[`${x},${y}`]) {
    return dayCoordsToName[`${x},${y}`];
  }
};

const Board = ({ board = null }) => {
  useEffect(() => {
    console.log("board changed inside Board", board);
  }, [board]);
  if (board === null) {
    return null;
  } else {
    return (
      <Grid
        className="board"
        container
        spacing={0}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {board.map((row, i) => {
          return (
            <Grid
              item
              xs={12}
              key={i}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              {row.map((cell, j) => {
                return (
                  <Item
                    key={`${i}-${j}-${cell}`}
                    className={cell === 1 ? "board-cell active" : "board-cell"}
                    style={{
                      backgroundColor: cell === 1 ? "lightbrown" : "white",
                    }}
                  >
                    {cell === 1 || cell === 0 ? (
                      getFriendlyNameFromBoardCoords(i, j)
                    ) : (
                      <PieceCell name={cell} cell={cell} placed={true} />
                    )}
                  </Item>
                );
              })}
            </Grid>
          );
        })}
      </Grid>
    );
  }
};
export default Board;
