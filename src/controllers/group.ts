import express, { Request, Response } from 'express';

//Other
import mongoose from 'mongoose';

//Model

//Service
import { getGroup } from '../services/Group';
import { createMessage } from '../services/Message';

//Middleware
import { emptyBodyCheck, validateToken } from './middleware/middleware';

const router = express.Router();

router.get('/:senderId/:receiverId', [validateToken], async (req: Request, res: Response) => {
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


export default router;