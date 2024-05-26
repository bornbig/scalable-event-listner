const Sequelize = require("sequelize");


const sequelize = new Sequelize(
 'freedb_activity',
 'freedb_abhishek_activity',
 '&9SfNVkgbbWp%W?',
  {
    host: 'sql.freedb.tech',
    dialect: 'mysql'
  }
);

module.exports = sequelize;