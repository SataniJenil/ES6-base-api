import { Sequelize } from "sequelize";
import { initialize } from "../model";
require("dotenv").config();

var HOST = process.env.DB_HOST;
var PORT = process.env.PostGres_PORT;
var post = process.env.DB_DATABASE;
var get = process.env.DB_UN;
var psw = process.env.DB_PASSWORD;

const connection = new Sequelize(post, get, psw, {
  host: HOST,
  port: PORT,
  dialect: "postgres",
});
initialize(connection);

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

export default db;
