'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.News, {
        as: "news",
        foreignKey: {
          name: "news_id",
          allowNull: false
        },
      });

      Comment.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "user_id",
          allowNull: false
        },
      });
    }
  };
  Comment.init({
    user_id: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    news_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
    paranoid: true,
  });
  return Comment;
};