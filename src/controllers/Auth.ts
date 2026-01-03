import { Request , Response } from "express";
import User from "../models/Auth";


export const register = async (req : Request , res : Response) : Promise<void> => {
    const { first_name , last_name , email , password } = req.body;
  
    try {
      
    if(!first_name || !last_name || !email || !password ) {
        res.status(400).send({
            success : false,
            message : "Please fill all the details to register !"
        })
    }
    const existing_user = await User.findOne({where : {email : email}}) 
    if(existing_user) {
         res.status(400).send({
            success : false,
            message : "Please fill all the details to register !"
        })
    }

    const user = await User.create({
        first_name,
        last_name,
        email,
        password,
        is_active : true
    })
    res.status(200).send({
        success : true,
        message : "User registered successfully !"
    })
    } catch (error) {
        console.log(error , "error");
        res.status(400).send({
        success : false,
        message : "Internal Server Error !"
    })
    }
}