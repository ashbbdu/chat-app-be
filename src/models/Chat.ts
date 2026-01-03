import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/database";

type ChatAttributes = {
  id: number;
  user : number;
  roomId : number;
  message : string;   
};

type ChatCreationAttributes = Optional<ChatAttributes, "id">;

class Chat extends Model<ChatAttributes, ChatCreationAttributes> {
  declare id : number;
  declare user : number;
  declare roomId : number;
  declare message : string;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
      user: {
      type: new DataTypes.INTEGER,
      allowNull: false,
    },
     roomId: {
      type: new DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "chats",
    timestamps: true,
  }
);


export default Chat;