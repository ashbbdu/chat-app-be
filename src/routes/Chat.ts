import express from "express";
import { login, register } from "../controllers/Auth";
import { getAllChats } from "../controllers/Chat";

const router = express.Router();

router.get("/all-chats" , getAllChats)


export default router;