import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/database";

type UserAttributes = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_active: boolean;
};

type UserCreationAttributes = Optional<UserAttributes, "id">;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare password: string;
  declare is_active: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    last_name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    is_active: {
      type: new DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);


export default User;