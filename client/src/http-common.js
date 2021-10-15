import axios from "axios";
var baseURL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  baseURL = "http://localhost:5000";
} else {
  // production code
  baseURL = "";
}
export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
