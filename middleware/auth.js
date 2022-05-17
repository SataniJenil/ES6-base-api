import jwt from "jsonwebtoken";
require("dotenv").config();
var secret = process.env.SECRET;
import { db } from "../config";
const models = db.connection.models;
import { infoLogger, errorLogger } from "../logger";

const auth = async (req, res, next) => {
  try {
    infoLogger.info(req.decoded);

    const token = req.header("Authorization").replace("Bearer", "").trim();
    if (!token) throw new Error("token is not Authorization");

    const decoded = jwt.verify(token, secret);
    if (!decoded) throw new Error("id  is not decoded");

    const user = await models.User.findOne({
      _id: decoded._id,
    });
    if (!user) throw new Error("user is not found mmmmm");
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    errorLogger.error(error.message);
    res.status(401).send({ success: false, message: error.message });
  }
};

export default auth;
