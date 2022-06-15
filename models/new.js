"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class New extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      New.belongsTo(models.Categorie, { as: "categorie" });
    }
  }
  News.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
      categoriId: DataTypes.INTEGER,
      softDeletes: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "New",
    }
  );
  return New;
};
