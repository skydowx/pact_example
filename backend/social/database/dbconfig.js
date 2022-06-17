const Knex = require("knex");
const { Model } = require("objection");

const knexConfig = require("./knexfile");

const knex = Knex(knexConfig.development);

exports.dbConnection = () => {
  Model.knex(knex);
  console.info("DB Created");
};

exports.destroyDB = () => {
  knex.destroy();
  console.info("DB Destroyed");
};
