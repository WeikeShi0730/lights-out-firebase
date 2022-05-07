import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/header/header.component";
import Main from "./pages/main/main.component";
import Footer from "./components/footer/footer.component";
import SignIn from "./components/sign-in/sign-in.component";
import SignUp from "./components/sign-up/sign-up.component";
import SignOut from "./components/sign-out/sign-out.component";

function App() {
  return (
    <div className="h-full w-full">
      <ToastContainer autoClose={4000} />
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route path="/sign-out/:id" component={SignOut} />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
