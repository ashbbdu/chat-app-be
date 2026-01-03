import { WebSocket, WebSocketServer } from "ws";
import Room from "../models/Rooms";

// const wss = new WebSocketServer({ port: 8081 });
// let allSockets: WebSocket[] = [];
// let userCount = 0;

// wss.on("connection", (socket) => {
// userCount++; 
//   allSockets.push(socket);
//   socket.on("message", (message) => {
//     for (let i = 0; i < allSockets.length; i++) {
//       let s = allSockets[i];
//       s.send(`User ${userCount} : ${message.toString()}`);
//     }
//   });
// });


// room logic



const wss = new WebSocketServer({ port: 8081 });


interface User {
    socket : WebSocket;
    room : string;
}

let allSockets : User[] = [];

 wss.on("connection",  (socket) => {
    socket.on("message" , async (message : string) => {
        const parsedMessage = JSON.parse(message);
        if(parsedMessage.type === "join") {
            allSockets.push({
                socket : socket,
                room : parsedMessage.payload.roomId
            })
            const room = await Room.create({
                user : 1,
                room : parsedMessage.payload.roomId
            })
        }

        if(parsedMessage.type === "chat") {
            let currentRoom = null;
            for(let i = 0 ; i < allSockets.length ; i++) {
               if(allSockets[i].socket === socket) {
                console.log(allSockets[i].room , "current user room id")
                currentRoom = allSockets[i].room;
               } 
            }

            // now broadcast the message to users of a particular room
             for(let i = 0 ; i < allSockets.length ; i++) {
               if(allSockets[i].room === currentRoom) {
                    allSockets[i].socket.send(parsedMessage.payload.message);
               } 
            }

        }
    })
//   allSockets.push(socket);

//   socket.on("message", (message) => {
//     for (let i = 0; i < allSockets.length; i++) {
//       let s = allSockets[i];
//       s.send(`User ${userCount} : ${message.toString()}`);
//     }
//   });
});

