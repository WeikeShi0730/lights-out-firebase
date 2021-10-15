module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();
  app.use("/api", router);

  // Create a new User
  router.post("/sign-up", users.create);

  //Sign In
  router.post("/sign-in", users.signIn);

  // Retrieve all Users
  router.get("/get", users.findAll);

  // Update a User with id
  router.put("/update", users.update);

  // Delete a User with id
  router.delete("/sign-out/:id", users.delete);
};
