

import express from "express";
import dotenv from "dotenv";
import connect from "./utils/database";
import User from "./models/Auth";
import authRoutes from "./routes/Auth"
dotenv.config();


const app = express();
app.use(express.json())

const PORT = process.env.PORT || 4002;

// User.sync()



app.use("/api/v1/auth" , authRoutes)

app.use("/" , (req , res) => {
    res.send("App is running !")
})

app.listen(PORT , () => {
    console.log(`App is running on PORT : ${PORT}`)
})
