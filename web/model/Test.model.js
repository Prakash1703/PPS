import { DataTypes } from "sequelize";
import SequelizeInstance from "../custom_config/db.sequelize.config.js";

const Product = SequelizeInstance.define(
  "Test",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default Product;
