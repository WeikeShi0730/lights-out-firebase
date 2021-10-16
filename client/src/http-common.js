import axios from "axios";
var url;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  console.log("dev")
  url = "http://localhost:5000/api";
} else {
  // production code
  console.log("prod")
  url = "https://f1-lightsout.herokuapp.com/api";
}
export default axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
  },
});
