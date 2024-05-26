const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connection")

const activity = sequelize.define("Activity", {
   id: {
     type: DataTypes.INTEGER,
     autoIncrement: true,
     primaryKey: true,
   },
   fromAddress: {
     type: DataTypes.STRING,
   },
   toAddress: {
     type: DataTypes.STRING,
   },
   contract: {
     type: DataTypes.STRING,
   },
   tokenId: {
     type: DataTypes.STRING,
   }
}, {
    tableName: "activity",
    timestamp: true
});

module.exports = activity;