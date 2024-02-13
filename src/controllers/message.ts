import express, { Request, Response } from 'express';

//Model
import { IMessage } from '../models/Message/IMessage';

//Service
import { createMessage, getMessagesForGroup } from '../services/Message';

//Middleware
import { emptyBodyCheck, validateToken } from './middleware/middleware';

const router = express.Router();

router.get('/group/:groupId', [validateToken], async (req: Request, res: Response) => {
    const groupId: string = req.params.groupId;
    const messages = await getMessagesForGroup(groupId);

    res.status(200).json(messages);
})

router.post('/', [emptyBodyCheck, validateToken], async (req: Request, res: Response) => {
    const message: IMessage = req.body;

    await createMessage(message);

    res.status(200).json("Message created successfully!")
})

export default router;