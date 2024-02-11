import express, { Request, Response } from 'express';
import { IMessage } from '../models/Message/IMessage';
import { createMessage, getMessagesForGroup } from '../services/Message';

//Model

//Service

//Middleware
import { emptyBodyCheck } from './middleware/middleware';

const router = express.Router();

router.get('/group/:groupId', async (req: Request, res: Response) => {
    const groupId: string = req.params.groupId;
    const messages = await getMessagesForGroup(groupId);

    res.status(200).json(messages);
})

router.post('/', async (req: Request, res: Response) => {
    const message: IMessage = req.body;

    await createMessage(message);

    res.status(200).json("Message created successfully!")
})

export default router;