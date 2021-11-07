import React from "react";
import ReactCountryFlag from "react-country-flag";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.utils";

const IndividualPlayer = ({ user, ranking }) => {
  const [currentUser] = useAuthState(auth);
  const rankingMedal = (ranking) => {
    switch (ranking) {
      case 1:
        return <span>🥇</span>;
      case 2:
        return <span>🥈</span>;
      case 3:
        return <span>🥉</span>;
      default:
        return <span>{ranking}.</span>;
    }
  };
  return (
    <div
      className={`h-8 md:h-10 lg:h-12 grid gap-x-2 grid-cols-7 my-2 content-center ${
        currentUser && currentUser.id === user.id ? "bg-gray-300 rounded " : ""
      }`}
      key={user.id}
    >
      <div className="col-span-4 mx-5">
        <span className="">{rankingMedal(ranking)}</span>{" "}
        <span className="flex-shrink-0">
          <ReactCountryFlag countryCode={user.country} svg />{" "}
        </span>
        <span>{user.name}</span>
      </div>
      <div className="grid item-center justify-items-end col-span-3 mx-5">
        {user.timer !== Number.MAX_VALUE
          ? user.timer.toFixed(3) + " s"
          : "no data"}
      </div>
    </div>
  );
};

export default IndividualPlayer;
