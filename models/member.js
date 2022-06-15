'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Member.init({
    id: {
      type:DataTypes.INTEGER,
      autoIncrement: true,
      allowNull:false,
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },

    facebookUrl: {
      type:DataTypes.STRING
    },

    instagramUrl: {
      type:DataTypes.STRING
    },

    linkedinUrl: {
      type:DataTypes.STRING
    },

    image: {
      type:DataTypes.STRING,
      allowNull:false
    },

    description: {
      type:DataTypes.STRING
    }
  }, {
    timestamps: false,
    createdAt: true,
    updatedAt: true,
    sequelize,
    modelName: 'Member',
  });
  return Member;
};