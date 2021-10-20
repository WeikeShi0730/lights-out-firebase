const jwt = require("jsonwebtoken");

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
  router.put("/update", authenticateToken, users.update);

  // Update a User with id
  router.put("/delete-record/:id", authenticateToken, users.deteleRecord);

  // Delete a User with id
  router.delete("/delete/:id", authenticateToken, users.delete);
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (token === null || token === undefined) {
    return res.sendStatus(401).send({
      message: "unauthorized, please sign in again",
    });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send({
        message: "session expired, please sign in again",
      });
    }
    req.user = user;
    next();
  });
};
