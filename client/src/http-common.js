import axios from "axios";
var url;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  url = "http://localhost:5000/api";
} else {
  // production code
  url = "";
}
export default axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
  },
});
