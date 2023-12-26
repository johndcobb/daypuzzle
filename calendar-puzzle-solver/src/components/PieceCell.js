import React from "react";
const PieceCell = ({ cell, name, placed = false }) => {
  const colorMap = {
    Z: "red",
    O: "blue",
    X: "green",
    U: "purple",
    P: "orange",
    S: "pink",
    T: "brown",
    L2: "gray",
  };
  const color = colorMap[name] || "yellow";
  if (cell != 0) {
    return (
      <div
        className={placed ? "piece-cell placed" : "piece-cell"}
        style={{
          backgroundColor: color,
        }}
      >
        {name}
      </div>
    );
  } else {
    return (
      <div
        className="piece-cell"
        style={{
          backgroundColor: "white",
        }}
      ></div>
    );
  }
};
export default PieceCell;
