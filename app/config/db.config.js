module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "www1234",
  DB: "lights_out_node_development",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
