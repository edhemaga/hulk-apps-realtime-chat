import express, { Express, Request, Response } from "express";

//Routes
import userRoutes from "../src/controllers/user";

//Env
import { resolve } from 'path';
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: resolve(__dirname, ".env") });

const app: Express = express();
const port = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});