module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
    app.use('/', router);
  
    // Create a new User
    router.post("/register", users.create);

    //Sign In
    router.post("/signIn",users.signIn);
  
    // Retrieve all Users
    router.get("/", users.findAll);
  
    // Retrieve a single Users with id
    router.get("/:id", users.findOne);
  
    // Update a User with id
    router.put("/:id", users.update);
  
    // Delete a User with id
    router.delete("/:id", users.delete);
  
    // Delete all Users
    router.delete("/", users.deleteAll);
  
  };