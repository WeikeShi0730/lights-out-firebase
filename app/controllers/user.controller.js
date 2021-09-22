const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const CryptoJS = require("crypto-js");

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

  // Check if name is already in use
  const duplicate = await findExistName(req.body.name);
  if (duplicate) {
    res.status(400).send({
      message: "Username already exists",
    });
    return;
  }

  const name = req.body.name;
  const password = req.body.password;
  const encryptedPassword = encryption(name, password);
  const user = {
    name: name,
    password: encryptedPassword,
    timer: null,
  };

  User.create(user)
    .then((data) => {
      const userObj = data.dataValues;
      const { password, ...userObjReturn } = userObj;
      res.status(200).send(userObjReturn);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Failed to create a driver profile.",
      });
    });
};

//Sign In
exports.signIn = async (req, res) => {
  const name = req.body.name;
  const exist = await findExistName(name);
  if (!exist) {
    res.status(400).send({
      message: "Cannot find the name provided",
    });
    return;
  }

  const password = req.body.password;
  const verifiedUser = await checkPassword(name, password);
  if (verifiedUser) {
    res.status(200).send(verifiedUser);
  } else {
    res.status(400).send({
      message: "Sign In failed, wrong password",
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      var userObjReturnArray = [];
      data.forEach((user) => {
        const userObj = user.dataValues;
        const { password, ...userObjReturn } = userObj;
        userObjReturnArray.push(userObjReturn);
      });
      res.status(200).send(userObjReturnArray);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  console.log("hello find one");
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

//private
const findExistName = async (newName) => {
  const user = await User.findAll({
    where: {
      name: newName,
    },
  });
  return user.length > 0;
};

//
const checkPassword = async (name, password) => {
  const user = await User.findAll({
    where: {
      name: name,
    },
  });
  const userObj = user[0].dataValues;
  const decryptedPassword = decrytion(name, userObj.password);
  if (password === decryptedPassword) {
    const { password, ...userOmitPassword } = userObj;
    console.log(userOmitPassword);
    return userOmitPassword;
  }
  return false;
};

const encryption = (passphrase, password) => {
  return CryptoJS.AES.encrypt(password, passphrase).toString();
};

const decrytion = (passphrase, encryptedPassword) => {
  return CryptoJS.AES.decrypt(encryptedPassword, passphrase).toString(
    CryptoJS.enc.Utf8
  );
};
