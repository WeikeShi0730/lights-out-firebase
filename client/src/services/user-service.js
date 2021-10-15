import http from "../http-common";

const signUp = (data) => {
  return http.post("/api/sign-up", data);
};

const signIn = (data) => {
  return http.post("/api/sign-in", data);
};

const getAll = () => {
  return http.get("/api");
};

const update = (newData) => {
  return http.put("/api", newData);
};

const remove = (id) => {
  return http.delete(`/api/sign-out/${id}`);
};

const UserService = {
  signUp,
  signIn,
  getAll,
  update,
  remove,
};
export default UserService;
