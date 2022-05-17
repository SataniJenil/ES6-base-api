import { Sequelize } from "sequelize";
import { user, todo, employee } from "./index";

export default (connection) => {
  const userModel = user(connection, Sequelize);
  const todoModel = todo(connection, Sequelize);
  const employeeModel = employee(connection, Sequelize);
  userModel.hasMany(todoModel, {
    as: "user",
    foreignKey: "userId",
  });

  return { userModel, todoModel, employeeModel };
};
