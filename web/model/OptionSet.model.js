import { DataTypes } from "sequelize";
import SequelizeInstance from "../custom_config/db.sequelize.config.js";

const OptionSetModel = SequelizeInstance.define(
  "OptionSet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    option_set: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    store_name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default OptionSetModel;
