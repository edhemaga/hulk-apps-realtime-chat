import express, { Request, Response } from 'express';
import { IMessage } from '../models/Message/IMessage';

//Model

//Service

//Middleware
import { emptyBodyCheck } from './middleware/middleware';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    let message: IMessage = req.body;

}) 

export default router;