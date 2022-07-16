'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, {foreignKey: 'UserId'})
      Booking.belongsTo(models.Room, {foreignKey: 'RoomId'})
    }
  };
  Booking.init({
    UserId: DataTypes.INTEGER,
    RoomId: DataTypes.INTEGER,
    purpose: {
      type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: `Purpose is required`,
				},
				notEmpty: {
					args: true,
					msg: `Purpose is required`,
				},
			},
    },
    booking_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Booking date is required'
        },
        notEmpty: {
          args: true,
          msg: 'Booking date is required'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    } 
  }, {
    sequelize,
    modelName: 'Booking',
    validate: {
      checkDate(){
        if(new Date(this.booking_date) < new Date()){
          throw new Error ("Input date in the future")
        }

      },
    }

  });
  return Booking;
};