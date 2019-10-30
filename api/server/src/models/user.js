'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    attendance: DataTypes.INTEGER,
    ip1: DataTypes.INTEGER,
    ip2: DataTypes.INTEGER,
    ip3: DataTypes.INTEGER,
    ip4: DataTypes.INTEGER,
    recom1: DataTypes.BOOLEAN,
    recom2: DataTypes.BOOLEAN,
    reason1: DataTypes.STRING,
    reason2: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
