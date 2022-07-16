'use strict';

const { encryptPassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Booking)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
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
    email: {
      type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: {
					args: true,
					msg: 'Input valid email'
				},
				notNull: {
					args: true,
					msg: `Email is required`,
				},
				notEmpty: {
					args: true,
					msg: `Email is required`,
				},
			},
    } ,
    password: {
      type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: `Password is required`,
				},
				notEmpty: {
					args: true,
					msg: `Password is required`,
				},
			},
    } ,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'employee'
    } 
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, options){
        user.password = encryptPassword(user.password)
		user.email = user.email.toLowerCase()
      }
    }
  });
  return User;
};