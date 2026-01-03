// import { WebSocket, WebSocketServer } from "ws";

// // const wss = new WebSocketServer({ port: 8081 });
// // let allSockets: WebSocket[] = [];
// // let userCount = 0;

// // wss.on("connection", (socket) => {
// // userCount++; 
// //   allSockets.push(socket);
// //   socket.on("message", (message) => {
// //     for (let i = 0; i < allSockets.length; i++) {
// //       let s = allSockets[i];
// //       s.send(`User ${userCount} : ${message.toString()}`);
// //     }
// //   });
// // });


// // room logic



// const wss = new WebSocketServer({ port: 8081 });


// interface User {
//     socket : WebSocket;
//     room : string;
// }

// let allSockets : User[] = [];

// wss.on("connection", (socket) => {
//     socket.on("message" , (message : string) => {
//         const parsedMessage = JSON.parse(message);
//         if(parsedMessage.type === "join") {
//             allSockets.push({
//                 socket : socket,
//                 room : parsedMessage.payload.roomId
//             })
//         }

//         if(parsedMessage.type === "chat") {
//             let currentRoom = null;
//             for(let i = 0 ; i < allSockets.length ; i++) {
//                if(allSockets[i].socket === socket) {
//                 console.log(allSockets[i].room , "current user room id")
//                 currentRoom = allSockets[i].room;
//                } 
//             }

//             // now broadcast the message to users of a particular room
//              for(let i = 0 ; i < allSockets.length ; i++) {
//                if(allSockets[i].room === currentRoom) {
//                     allSockets[i].socket.send(parsedMessage.payload.message);
//                } 
//             }

//         }
//     })
// //   allSockets.push(socket);

// //   socket.on("message", (message) => {
// //     for (let i = 0; i < allSockets.length; i++) {
// //       let s = allSockets[i];
// //       s.send(`User ${userCount} : ${message.toString()}`);
// //     }
// //   });
// });





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
