import axios from "axios";
var baseURL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:5000";
} else {
  // production code
  baseURL = "https://f1-lightsout.herokuapp.com/";
}
export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
