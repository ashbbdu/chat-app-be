import { Request, Response } from "express";
import Chat from "../models/Chat";

export const getAllChats = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { roomid } = req.body;
  try {
    const chat = await Chat.findAll({ where: { roomId: roomid } });
    res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.log(error, "Error while fetching chats !");
    res.status(400).send({
      success: false,
      message: "Internal Server Error !",
    });
  }
};
