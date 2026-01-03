import { Sequelize } from "sequelize";



const sequelize = new Sequelize('chat-app', 'root', 'ash@Compunnel09', {
  host: 'localhost',
  dialect: "mysql",
  logging : false
})

sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.")
}).catch((err) => {
     console.error('Unable to connect to the database:', err);
})



export default sequelize;
