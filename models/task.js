'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    currentStatus: DataTypes.STRING,
    lastDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  Task.associate = function (models) {
    models.Task.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};
