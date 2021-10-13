import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import UserService from "../../services/user-service";
import { toast } from "react-toastify";
import { setCurrentUser } from "../../redux/actions/user.action";

const SignIn = ({ setCurrentUser }) => {
  const [signInInfo, setSignInInfo] = useState({
    name: "",
    password: "",
  });
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await UserService.signIn(signInInfo);
      setCurrentUser(res.data);
      history.push("/");
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      console.error(error.response.data.message);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setSignInInfo({
      ...signInInfo,
      [name]: value,
    });
  };

  return (
    <React.Fragment>
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-auto mt-10 bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <div className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          log in to your account 🔐
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label>username</label>
            <input
              required
              name="name"
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="name"
              placeholder="your username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>password</label>
            <input
              required
              name="password"
              type="password"
              className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              id="password"
              placeholder="your password"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              className="bg-gray-800 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark"
            >
              sign in
            </button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-md m-auto mt-4">
        <div className="flex justify-center items-center">don't have an account yet?</div>
        <div>
          <Link to="/sign-up">
            <div className="flex justify-center items-center mt-6">
              <button
                className="bg-gray-800 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark"
              >
                sign up
              </button>
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, { setCurrentUser })(SignIn);
