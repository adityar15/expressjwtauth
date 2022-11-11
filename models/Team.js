const { DataTypes } = require("sequelize");
const { sequelise } = require("../dbconfig");

const Team = sequelise.define('teams', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    department: DataTypes.STRING,
  })



  exports.Team = Team