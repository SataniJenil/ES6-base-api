const express = require("express");
const app = express();
import bodyParser from "body-parser";
import { db } from "./config";
import { user, todo } from "./api";
let port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", user);
app.use("/todo", todo);
app.use("/", express.static("imageStore"));

db.connection
  .authenticate()
  .then(() => console.log("connected to database successfully"))
  .catch((error) => console.log(error.message));

// db.connection.sync({ alter: true }).then(() => {
//   console.log("New table created!");
// });

app.listen(port, () => {
  console.log("connection start", port);
});
