'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.hasMany(models.Booking)
    }
  };
  Room.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: `Name is required`,
				},
				notEmpty: {
					args: true,
					msg: `Name is required`,
				},
			},
    }, 
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    } 
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};