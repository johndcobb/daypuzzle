import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Piece from "./Piece";

const PiecesDrawer = ({
  pieces = [],
  open = false,
  closeDrawerHandler = () => {},
}) => {
  return (
    <Drawer anchor={"bottom"} open={open} onClose={closeDrawerHandler}>
      <h3 style={{ textAlign: "center" }}>
        Your named puzzle pieces are below
      </h3>
      <div className="pieces-container">
        {pieces.map((piece) => {
          return (
            <Piece
              key={piece.name}
              name={piece.name}
              orientations={piece.orientations}
            />
          );
        })}
      </div>
    </Drawer>
  );
};

export default PiecesDrawer;
