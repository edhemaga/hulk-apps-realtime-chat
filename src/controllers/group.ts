import express, { Request, Response } from 'express';

//Other
import mongoose from 'mongoose';

//Model

//Service
import { getGroup } from '../services/Group';

//Middleware
import { emptyBodyCheck } from './middleware/middleware';
import { createMessage } from '../services/Message';
import { IMessage } from '../models/Message/IMessage';

const router = express.Router();

router.get('/:senderId/:receiverId', async (req: Request, res: Response) => {
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;
    //TODO Add error handling
    if (senderId !== 'undefined' && receiverId !== 'undefined') {
        const group = await getGroup(senderId, receiverId);
        res.status(200).json(group);
    } else {
        res.status(400).json("Bad request!")
    }
});

router.post('/:groupId', async (req: Request, res: Response) => {
    const groupId: string = req.params.groupId;
    const message: IMessage = req.body;

    await createMessage(groupId, message);
    
    res.status(200).json("Message successfully created!")
});

export default router;