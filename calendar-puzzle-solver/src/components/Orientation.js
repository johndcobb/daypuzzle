import React from "react";
import PieceCell from "./PieceCell";

const Orientation = ({ orientation, active = false, color, name }) => {
  return (
    <div style={{ display: active ? "block" : "none" }}>
      {orientation.map((row, i) => {
        return (
          <div
            key={`orientation-${i}`}
            style={{ margin: "0", display: "block" }}
          >
            {row.map((cell, j) => {
              return (
                <PieceCell
                  name={name}
                  color={color}
                  key={`${i}-${j}`}
                  cell={cell}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Orientation;
