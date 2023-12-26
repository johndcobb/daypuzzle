import React, { useState } from "react";
import ResponsiveAppBar from "./components/AppBar";
import Solver from "./components/Solver";

const App = () => {
  const [piecesDrawerOpen, setPiecesDrawerOpen] = useState(false);
  return (
    <>
      <ResponsiveAppBar
        handleOpenPiecesDrawer={() => {
          setPiecesDrawerOpen(true);
        }}
      />
      <Solver
        piecesDrawerOpen={piecesDrawerOpen}
        closeDrawerHandler={() => {
          setPiecesDrawerOpen(false);
        }}
      />
    </>
  );
};

export default App;
