import React, { Fragment, useState } from "react";
import "./lights.styles.scss";

import Stopwatch from "../stopwatch/stopwatch.component";

const Lights = ({ clickedInside }) => {
  const [lights, setLights] = useState(0);

  const handleLightsChange = (lights) => {
    setLights(lights);
  };

  return (
    <Fragment>
      <div className="f1-lights">
        <div className="back-board"></div>
        <div className={`light-strip ${lights >= 1 ? "on" : ""}`}>
          <div className="light"></div>
          <div className="light"></div>
          <div className="light"></div>
          <div className="light"></div>
        </div>
        <div className={`light-strip ${lights >= 2 ? "on" : ""}`}>
          <div className="light"></div>
          <div className="light"></div>
          <div className="light"></div>
          <div className="light"></div>
        </div>
        <div className={`light-strip ${lights >= 3 ? "on" : ""}`}>
          <div className="light"></div>
          <div className="light"></div>
          <div className="light"></div>
          <div className="light"></div>
        </div>
        <div className={`light-strip ${lights >= 4 ? "on" : ""}`}>
          <div className="light"></div>
          <div className="light"></div>
          <div className="light"></div>
          <div className="light"></div>
        </div>
        <div className={`light-strip ${lights >= 5 ? "on" : ""}`}>
          <div className="light"></div>
          <div className="light"></div>
          <div className="light"></div>
          <div className="light"></div>
        </div>
      </div>
      <Stopwatch
        onLightsChange={handleLightsChange}
        clickedInside={clickedInside}
      />
    </Fragment>
  );
};

export default Lights;
