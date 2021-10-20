import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/actions/user.action";
import { setLeaderboard } from "../../redux/actions/leaderboard.action";
import { toast } from "react-toastify";
import UserService from "../../services/user-service";

const SignOut = ({ currentUser, setCurrentUser, setLeaderboard }) => {
  const history = useHistory();
  const clearCurrentUser = () => {
    setCurrentUser(null);
  };
  const handleDeleteAccount = async () => {
    clearCurrentUser();
    try {
      await UserService.remove(currentUser.id, currentUser.token);
      const leaderboard = await UserService.getAll();
      setLeaderboard(leaderboard.data);
      toast.info("deleted 🏁", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
        autoClose: 2000,
      });
    } catch (error) {
      history.push("/sign-in");
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      console.error(error.response.data.message);
    }
  };

  const handleDeleteRecord = async () => {
    try {
      let updatedUser = { ...currentUser };
      updatedUser["timer"] = Number.MAX_VALUE;
      const { token, ...updatedUserNoToken } = updatedUser;
      setCurrentUser(updatedUser);
      await UserService.deleteRecord(currentUser.id, updatedUserNoToken, token);
      toast.success("user record deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
        autoClose: 3000,
      });
      history.push("/");
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  };

  return (
    <div className="grid grid-rows-5 grid-flow-col gap-4 justify-items-center mt-10">
      <Link to="/">
        <button
          onClick={clearCurrentUser}
          className="text-xs md:text-sm lg:text-base bg-gray-800 py-2 px-4 text-white rounded border focus:outline-none"
        >
          sign out
        </button>
      </Link>
      <div />
      <div />
      <Link to="/">
        <button
          onClick={handleDeleteRecord}
          className="text-xs md:text-sm lg:text-base py-2 px-4 text-red-800 rounded border border-red-800 focus:outline-none"
        >
          delete my result
        </button>
      </Link>
      <Link to="/">
        <button
          onClick={handleDeleteAccount}
          className="text-xs md:text-sm lg:text-base bg-red-800 py-2 px-4 text-white rounded border focus:outline-none"
        >
          delete account
        </button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, { setCurrentUser, setLeaderboard })(
  SignOut
);
