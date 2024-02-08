import express, { Express, Request, Response } from "express";

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

//Socket ini
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket: Socket) => {
    console.log("A user has connected!");
})

app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});