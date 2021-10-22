import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6 ">
        <div className="flex items-center flex-shrink-0 flex-grow text-white mr-6">
          <Link to="/">
            <img
              className="fill-current xs:mr-2 h-6 sm:h-8 md:h-10 lg:h-12"
              src="/header.png"
              alt="F1"
            />
          </Link>
        </div>

        <div className="block text-sm md:text-base lg:text-lg lg:flex lg:items-center lg:w-auto">
          {user ? (
            // <Link to={`/sign-out/${currentUser.id}`}>
            //   <button className="inline-block px-4 py-2 leading-none rounded text-white hover:bg-gray-700 lg:mt-0">
            //     {currentUser.name}
            //   </button>
            // </Link>
            <div>hello</div>
          ) : (
            <Link to="/sign-in">
              <button className="inline-block px-4 py-2 leading-none rounded text-white hover:bg-gray-700 lg:mt-0">
                sign in
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(Header);
