const { DataTypes } = require("sequelize");
const { sequelise } = require("../dbconfig");

const User = sequelise.define("users", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  firstname: DataTypes.STRING,
  password: DataTypes.STRING,
  lastname: DataTypes.STRING,
  contact: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: DataTypes.STRING,
});

exports.User = User;
