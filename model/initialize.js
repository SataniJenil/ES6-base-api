import { Sequelize } from "sequelize";
import { user, todo, employee, csv } from "./index";

export default (connection) => {
  const userModel = user(connection, Sequelize);
  const todoModel = todo(connection, Sequelize);
  const employeeModel = employee(connection, Sequelize);
  const csvModel = csv(connection, Sequelize);

  userModel.hasMany(todoModel, {
    as: "user",
    foreignKey: "userId",
  });

  return { userModel, todoModel, employeeModel, csvModel };
};
