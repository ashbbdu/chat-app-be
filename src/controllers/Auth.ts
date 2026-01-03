import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/Auth";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { first_name, last_name, email, password } = req.body;

  try {
    if (!first_name || !last_name || !email || !password) {
      res.status(400).send({
        success: false,
        message: "Please fill all the details to register !",
      });
    }
    const existing_user = await User.findOne({ where: { email: email } });
    if (existing_user) {
      res.status(400).send({
        success: false,
        message: "Please fill all the details to register !",
      });
    }

    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      is_active: true,
    });
    res.status(200).send({
      success: true,
      message: "User registered successfully !",
      user,
    });
  } catch (error) {
    console.log(error, "Error while creating a user !");
    res.status(400).send({
      success: false,
      message: "Internal Server Error !",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  // Password match logic bcrypt everthing is pending right now
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).send({
        success: false,
        message: "Please fill all the details to login !",
      });
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User with this email not found , Please register",
      });
    }
    const payload = {
      id: user?.id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "14h",
    });

    //   @ts-ignore
    user?.password = undefined;

    res.status(200).json({
      success: false,
      message: "Logged in successfully !",
      user,
      token,
    });
  } catch (error) {
    console.log(error, "Error while loggin in !");
    res.status(400).send({
      success: false,
      message: "Internal Server Error !",
    });
  }
};
