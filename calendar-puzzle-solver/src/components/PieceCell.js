import React from "react";
const PieceCell = ({ cell, color, name }) => {
  if (cell === 1) {
    return (
      <div
        style={{
          backgroundColor: color,
          padding: "1rem",
          margin: "0",
          display: "inline-block",
          height: "50px",
          width: "50px",
          textAlign: "center",
          verticalAlign: "middle",
        }}
      >
        {name}
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "1rem",
          margin: "0",
          display: "inline-block",
          height: "50px",
          width: "50px",
          textAlign: "center",
          verticalAlign: "middle",
        }}
      ></div>
    );
  }
};
export default PieceCell;
