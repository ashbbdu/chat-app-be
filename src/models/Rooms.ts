import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/database";

type RoomAttributes = {
  id: number;
  user : number;
  room : number;   
};

type RoomCreationAttributes = Optional<RoomAttributes, "id">;

class Room extends Model<RoomAttributes, RoomCreationAttributes> {
  declare id : number;
  declare user : number;
  declare room : number;
}

Room.init(
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
    room: {
      type: new DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "rooms",
    timestamps: true,
  }
);


export default Room;