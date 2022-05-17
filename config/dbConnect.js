import { Sequelize } from "sequelize";
import { initialize } from "../model";
require("dotenv").config();
var HOST = process.env.HOST;
console.log("secret", HOST);
var PORT = process.env.PostGres_PORT;
console.log("PORT", PORT);
var post = process.env.DATABASE;
console.log("post", post);
var get = process.env.UN;
console.log("get", get);
var put = process.env.PASSWORD;
console.log("put", put);

const connection = new Sequelize(post, get, put, {
  host: HOST,
  port: PORT,
  dialect: "postgres",
});
initialize(connection);

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

export default db;
