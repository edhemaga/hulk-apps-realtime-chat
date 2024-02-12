import express, { Request, Response } from 'express';

//Model
import { INewGroup } from '../models/Group/IGroup';

//Service
import { createGroup, getRoom, getSingleGroup } from '../services/Group';

//Middleware
import { emptyBodyCheck, validateToken } from './middleware/middleware';

const router = express.Router();

router.get('/room/:id', [validateToken], async (req: Request, res: Response) => {
    const roomId: string = req.params.id;
    const group = await getRoom(roomId);
    res.status(200).json(group);

})

router.get('/:senderId/:receiverId', [validateToken], async (req: Request, res: Response) => {
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;
    //TODO Add error handling
    if (senderId !== 'undefined' && receiverId !== 'undefined') {
        const group = await getSingleGroup(senderId, receiverId);
        res.status(200).json(group);
    } else {
        res.status(400).json("Bad request!")
    }
});

router.post('/', [validateToken, emptyBodyCheck], async (req: Request, res: Response) => {
    //TODO add error handling
    const group: INewGroup = req.body;
    await createGroup(group);
    res.status(200).json("Group sucessfully created!")
})

export default router;