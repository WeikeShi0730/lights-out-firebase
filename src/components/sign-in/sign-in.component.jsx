import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmail } from "../../firebase/firebase.utils";

const SignIn = () => {
  const [signInInfo, setSignInInfo] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmail(signInInfo);
      history.push("/");
    } catch (error) {
      toast.error("error signing in: " + error.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      console.error("error signing in: ", error.message);
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
      <div className="max-w-xs md:max-w-md lg:max-w-lg m-auto mt-10 bg-white rounded-lg border border-primaryBorder shadow-default py-8 px-10">
        <div className="text-base lg:text-lg font-medium text-primary mt-4 mb-12 text-center">
          log in to your account 🔐
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-sm md:text-base">email</label>
            <input
              required
              name="email"
              type="email"
              className="w-full p-2 text-xs md:text-md text-primary border rounded-md outline-none transition duration-150 ease-in-out mb-4"
              id="email"
              placeholder="your email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm md:text-base">password</label>
            <input
              required
              name="password"
              type="password"
              className="w-full p-2 text-xs md:text-md text-primary border rounded-md outline-none transition duration-150 ease-in-out mb-4"
              id="password"
              placeholder="your password"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              className="text-xs md:text-sm bg-gray-800 py-2 px-4 text-white rounded border focus:outline-none"
            >
              sign in
            </button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-md m-auto mt-4">
        <div className="text-base lg:text-lg flex justify-center items-center">
          don't have an account yet?
        </div>
        <div>
          <Link to="/sign-up">
            <div className="flex justify-center items-center mt-6">
              <button className="text-xs md:text-sm bg-gray-800 py-2 px-4 text-white rounded border focus:outline-none">
                sign up
              </button>
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
