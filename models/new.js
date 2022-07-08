"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      News.hasMany( models.Comment, {as : 'comments', foreignKey : 'news_id'} )
      News.belongsTo(models.Categories, {
        as: "categories",
        foreignKey: {
          name: "categoryId",
        },
      });
    }
  }
  News.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      content: DataTypes.TEXT,
      categoryId: DataTypes.INTEGER,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "News",
      paranoid: true,
    }
  );
  return News;
};
