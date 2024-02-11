import express, { Request, Response } from 'express';
import { IMessage } from '../models/Message/IMessage';
import { createMessage } from '../services/Message';

//Model

//Service

//Middleware
import { emptyBodyCheck } from './middleware/middleware';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const message: IMessage = req.body;
    
    await createMessage(message);

    res.status(200).json("Message created successfully!")
})

export default router;