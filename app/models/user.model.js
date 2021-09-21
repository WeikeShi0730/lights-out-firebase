module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    timer: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
