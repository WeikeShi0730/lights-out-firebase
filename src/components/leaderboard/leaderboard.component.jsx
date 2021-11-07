import React from "react";
//import { getUsers } from "../../firebase/firebase.utils";
import IndividualPlayer from "../individual-player/individual-player.component";
import { auth, leaderboardQuery } from "../../firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Leaderboard = () => {
  const [currentUser] = useAuthState(auth);
  const [leaderboard] = useCollectionData(leaderboardQuery);

  const dot = () => {
    return (
      <div className="grid gap-x-4 grid-cols-2">
        <div className="mx-10">...</div>
      </div>
    );
  };

  const leaderboardList = () => {
    const numberOfUser = leaderboard.length;
    const numberOfUsersDisplay =
      leaderboard.length > 10 ? 10 : leaderboard.length;
    const currentUserRanking = currentUser
      ? leaderboard.findIndex((user) => user.id === currentUser.id) + 1
      : -1;
    const lastPlace = leaderboard[leaderboard.length - 1];
    const lastPlaceRanking = leaderboard.length;

    if (currentUser) {
      if (currentUserRanking <= 10) {
        return (
          <div>
            {leaderboard.slice(0, numberOfUsersDisplay).map((user, i) => (
              <IndividualPlayer key={i} user={user} ranking={i + 1} />
            ))}
            {lastPlaceRanking > 10 ? (
              <div>
                {dot()}
                <IndividualPlayer user={lastPlace} ranking={lastPlaceRanking} />
              </div>
            ) : (
              ""
            )}
          </div>
        );
      } else {
        return (
          <div>
            {leaderboard.slice(0, numberOfUsersDisplay).map((user, i) => (
              <IndividualPlayer key={i} user={user} ranking={i + 1} />
            ))}
            {currentUserRanking > 11 ? dot() : ""}
            <IndividualPlayer user={currentUser} ranking={currentUserRanking} />
            {lastPlaceRanking - currentUserRanking > 0 ? (
              lastPlaceRanking - currentUserRanking > 1 ? (
                <div>
                  {dot()}
                  <IndividualPlayer
                    user={lastPlace}
                    ranking={lastPlaceRanking}
                  />
                </div>
              ) : (
                <IndividualPlayer user={lastPlace} ranking={lastPlaceRanking} />
              )
            ) : (
              ""
            )}
          </div>
        );
      }
    } else {
      if (numberOfUser <= 10) {
        return leaderboard
          .slice(0, numberOfUsersDisplay)
          .map((user, i) => (
            <IndividualPlayer key={i} user={user} ranking={i + 1} />
          ));
      } else {
        return (
          <div>
            {leaderboard.slice(0, numberOfUsersDisplay).map((user, i) => (
              <IndividualPlayer key={i} user={user} ranking={i + 1} />
            ))}
            {dot()}
            <IndividualPlayer user={lastPlace} ranking={lastPlaceRanking} />
          </div>
        );
      }
    }
  };

  return (
    <div>
      <h1 className="flex justify-center text-sm md:text-base lg:text-lg">
        leaderboard
      </h1>
      <div className="text-xs sm:text-sm lg:text-base">
        {leaderboard ? leaderboardList() : "Loading..."}
      </div>
    </div>
  );
};

export default Leaderboard;
