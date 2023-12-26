import React, { useEffect, useState } from "react";
import Orientation from "./Orientation";
const Piece = ({ name = null, orientations = [] }) => {
  const [activeOrientation, setActiveOrientation] = useState(0);
  const [color, setColor] = useState("yellow");
  useEffect(() => {
    // use name to set color
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
    setColor(colorMap[name] || "yellow");
    setActiveOrientation(0);
  }, []);

  if (orientations) {
    return (
      <div className="orientations">
        {orientations.map((orientation, i) => {
          return (
            <Orientation
              key={`orientation-${i}`}
              name={name}
              active={i === activeOrientation}
              orientation={orientation}
            />
          );
        })}
      </div>
    );
  }
};

export default Piece;
