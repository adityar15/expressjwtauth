const { DataTypes } = require("sequelize");
const { sequelise } = require("../dbconfig");


const Project = sequelise.define('projects', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
  })



  exports.Project = Project