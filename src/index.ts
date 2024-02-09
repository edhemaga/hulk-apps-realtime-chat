import express, { Express, Request, Response } from "express";

import cors from 'cors';
import bodyParser from "body-parser";

//Socket
import http from 'http';
import { Server, Socket } from 'socket.io';

//Routes
import userRoutes from "../src/controllers/user";

//Env
import { resolve } from 'path';
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: resolve(__dirname, ".env") });

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

io.on('connection', (socket: Socket) => {
    // console.log(socket.id);
})

app.use('/user', userRoutes);

//Entire server needs to be listening, not only app 
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});