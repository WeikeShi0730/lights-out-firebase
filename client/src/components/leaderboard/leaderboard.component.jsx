import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setLeaderboard } from "../../redux/actions/user.action";
import UserService from "../../services/user-service";

import IndividualPlayer from "../individual-player/individual-player.component";

const Leaderboard = ({ currentUser, leaderboard, setLeaderboard }) => {
  useEffect(() => {
    async function fecthData() {
      try {
        const fetchedData = await UserService.getAll();
        const data = fetchedData.data;
        setLeaderboard(data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    }
    fecthData();
  }, [setLeaderboard]);

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
      ? leaderboard.indexOf(currentUser.id) + 1
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
            {console.log("!!!!!!!!!!!!!!!!!!!!!!!!")}
            {console.log(leaderboard)}
            {console.log(leaderboard.slice(0, numberOfUsersDisplay))}
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
      <h1 className="flex justify-center text-2xl">leaderboard</h1>
      <div className="grid gap-y-8">
        <div className="ml-5 mr-5">{leaderboardList()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  leaderboard: state.user.leaderboard,
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, { setLeaderboard })(Leaderboard);
