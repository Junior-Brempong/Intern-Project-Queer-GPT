import React from "react";
import { useState } from "react";

export const Popup = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = (e) => {
    if (e) {
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="popUpSection">
      <button className="popUpButton" onClick={handleClick}></button>
      <img alt="" className="popUpImage"></img>
    </div>
  );
};
