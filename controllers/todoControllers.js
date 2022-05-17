import { db } from "../config";
const models = db.connection.models;
import { infoLogger, errorLogger } from "../logger";
import { Sequelize } from "sequelize";

const findUser = async (req, res) => {
  try {
    infoLogger.info(req.params);
    console.log("data", data);
    const data = await models.User.findAll({
      include: [
        {
          model: models.todo,
          as: "user",
          // attributes: ["email"],
        },
      ],
      // attributes: [[Sequelize.col("user.username"), "name"]],
    });
    if (!data) throw new Error("id is not found");
    else
      return res.status(200).json({
        success: true,
        message: "get details Successfully",
        data,
      });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

const addData = async (req, res) => {
  try {
    infoLogger.info(req.user, req.body);
    const data = await models.todo.create({
      ...req.body,
      userId: req.user.id,
    });
    console.log("data", data);
    res.json({
      success: true,
      message: "Todo Data add is success",
      data,
    });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateData = async (req, res) => {
  try {
    infoLogger.info(req.params, req.body);
    const { Title, content } = req.body;
    const data = await models.todo.update(
      {
        Title,
        content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!data) throw new Error("id is not found");
    res.json({ success: true, message: "todo data is update", data });
  } catch (err) {
    errorLogger.error(err.message);
    res.json({ success: false, message: err.message });
  }
};

const deleteData = async (req, res) => {
  try {
    infoLogger.info(req.params);
    const id = await models.todo.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!id) throw new Error("id is not found");
    res
      .status(200)
      .json({ success: true, message: "id delete id success", id });
  } catch (err) {
    errorLogger.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

export default { findUser, addData, updateData, deleteData };
