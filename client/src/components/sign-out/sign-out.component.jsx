import React from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  setCurrentUser,
  setLeaderboard,
} from "../../redux/actions/user.action";
import { toast } from "react-toastify";
import UserService from "../../services/user-service";

const SignOut = ({ currentUser, setCurrentUser, setLeaderboard }) => {
  const history = useHistory();
  const clearCurrentUser = () => {
    setCurrentUser(null);
  };
  const handleDelete = async () => {
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
  return (
    <div className="grid grid-rows-2 grid-flow-col gap-4 justify-items-center mt-20">
      <Link to="/">
        <button
          onClick={clearCurrentUser}
          className="bg-gray-800 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark"
        >
          sign out
        </button>
      </Link>
      <Link to="/">
        <button
          onClick={handleDelete}
          className="bg-red-800 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark"
        >
          delete acount
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
