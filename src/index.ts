import express, { Express, Request, Response } from "express";

//Other
import cors from 'cors';
import bodyParser from "body-parser";
import mongoose from "mongoose";

//Socket
import http from 'http';
import { Server, Socket } from 'socket.io';

//Routes
import userRoutes from "../src/controllers/user";
import messageRoutes from "../src/controllers/message"
import groupRoutes from "../src/controllers/group"

//Env
import { resolve } from 'path';
import dotenv from "dotenv";
import { IMessage } from "./models/Message/IMessage";
import { createMessage } from "./services/Message";

dotenv.config();
dotenv.config({ path: resolve(__dirname, ".env") });

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//TODO izbaciti u poseban fajl
//CORS
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(cors(options));

//Socket init
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

//DB connection
mongoose.connect(process.env.MONGO_DB ?? '')
    .then(() =>
        //Entire server needs to be listening, not only app 
        server.listen(port, () => {
            io.on('connection', (socket: Socket) => {
                socket.on('send_message', (data: IMessage) => {
                    createMessage(data);
                    //io must emit instead of socket, because with socket your message would be returned only to the client it sent
                    io.emit(
                        `receive_message_group_${data.groupId}`,
                        data
                    );
                })
                socket.on('disconnect', () => {
                    console.log('Client disconnected');
                });
            })
        },
        ),
    )
    .catch((error) => console.log(error));


app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use('/message', messageRoutes);

