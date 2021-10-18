import React from "react";
import "./main.styles.scss";

import Lights from "../../components/lights/lights.component";
import ClickInside from "../../components/click-inside/click-inside.componnet";
import Leaderboard from "../../components/leaderboard/leaderboard.component";

const Main = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-4">
        <div className="p-2 lg:col-span-2 main">
          <ClickInside>
            <Lights />
          </ClickInside>
        </div>

        <div className="m-auto justify-center lg:w-full lg:p-2 lg:m-0">
          <Leaderboard />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main;
