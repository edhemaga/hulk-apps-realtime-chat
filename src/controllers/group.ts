import express, { Request, Response } from 'express';

//Other
import mongoose from 'mongoose';

//Model

//Service
import { getGroup } from '../services/Group';

//Middleware
import { emptyBodyCheck } from './middleware/middleware';

const router = express.Router();

router.get('/:senderId/:receiverId', async (req: Request, res: Response) => {
    const senderId: string = req.params.senderId;
    const receiverId: string = req.params.receiverId;
    
    //TODO Add error handling
    const group = await getGroup(senderId, receiverId);

    res.status(200).json(group);
});

export default router;