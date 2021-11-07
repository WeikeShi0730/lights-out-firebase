import React from "react";
import { Link } from "react-router-dom";
import {
  auth,
  signOutGoogle,
  deleteUserAccount,
  deleteUserRecord,
} from "../../firebase/firebase.utils";
import { toast } from "react-toastify";

const SignOut = () => {
  const clearCurrentUser = async () => {
    try {
      if (auth.currentUser) {
        await signOutGoogle();
      }
    } catch (error) {
      console.error("error clear current user", error);
    }
  };
  const handleDeleteAccount = async () => {
    clearCurrentUser();
    try {
      await deleteUserAccount();
      toast.info("deleted 🏁", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("error deleting account", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      console.error("error deleting account", error);
    }
  };

  const handleDeleteRecord = async () => {
    try {
      await deleteUserRecord();
      toast.success("user record deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("error deleting record", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      console.error("error deleting record", error);
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

export default SignOut;
