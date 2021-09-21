const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Username cannot be empty",
    });
    return;
  } else if (!req.body.password) {
    res.status(400).send({
      message: "Password cannot be empty",
    });
    return;
  }

  const duplicate = await findExistName(req.body.name);
  if (duplicate) {
    res.status(400).send({
      message: "Username already exists",
    });
    return;
  }

  const user = {
    name: req.body.name,
    password: req.body.password,
    timer: null,
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Failed to create a driver profile.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

//private
const findExistName = async (newName) => {
  const users = await User.findAll({
    where: {
      name: newName,
    },
  });
  return users.length > 0;
};
