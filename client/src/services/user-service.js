import http from "../http-common";

const signUp = (data) => {
  return http.post("/sign-up", data);
};

const signIn = (data) => {
  return http.post("/sign-in", data);
};

const getAll = () => {
  console.log("http.get(" / ")", http.get("/api"));
  return http.get("/api");
};

const update = (newData) => {
  return http.put("/", newData);
};

const remove = (id) => {
  return http.delete(`/sign-out/${id}`);
};

const UserService = {
  signUp,
  signIn,
  getAll,
  update,
  remove,
};
export default UserService;
