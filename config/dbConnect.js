import { Sequelize } from "sequelize";
import { initialize } from "../model";

const connection = new Sequelize("postgres", "postgres", "postgres", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

initialize(connection);

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

export default db;
