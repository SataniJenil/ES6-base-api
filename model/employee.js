export default (connection, Sequelize) => {
  return connection.define("Employee", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    jobTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    hireDate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mobile: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
};
