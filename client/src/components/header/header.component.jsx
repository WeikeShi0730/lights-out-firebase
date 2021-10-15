import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = ({ currentUser }) => {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
        <div className="flex items-center flex-shrink-0 flex-grow text-white mr-6">
          <Link to="/api">
            <img
              className="fill-current xs:mr-2 h-8"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/1280px-F1.svg.png"
              alt="F1"
            />
          </Link>
        </div>

        <div className="block lg:flex lg:items-center lg:w-auto">
          {currentUser ? (
            <Link to={`/sign-out/${currentUser.id}`}>
              <button className="inline-block xs:px-4 py-2 leading-none rounded text-white hover:bg-gray-700 lg:mt-0">
                {currentUser.name}
              </button>
            </Link>
          ) : (
            <Link to="/api/sign-in">
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
