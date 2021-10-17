import http from "../http-common";

const signUp = (data) => {
  return http.post("/sign-up", data);
};

const signIn = (data) => {
  return http.post("/sign-in", data);
};

const getAll = () => {
  return http.get("/get");
};

const update = (newData, token) => {
  return http.put("/update", newData, { headers: { authorization: token } });
};

const remove = (id, token) => {
  return http.delete(`/delete/${id}`, { headers: { authorization: token } });
};

const UserService = {
  signUp,
  signIn,
  getAll,
  update,
  remove,
};
export default UserService;
