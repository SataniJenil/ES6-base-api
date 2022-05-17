export default (connection, Sequelize) => {
  return connection.define("todo", {
    Title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });
};
