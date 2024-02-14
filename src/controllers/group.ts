import express, { Request, Response } from 'express';

//Model
import { INewGroup } from '../models/Group/IGroup';

//Service
import { createGroup, getRoom, getSingleGroup, leaveGroup, /*leaveGroup */ } from '../services/Group';

//Middleware
import { decodeToken, emptyBodyCheck, validateToken } from './middleware/middleware';
import { JwtPayloadUserClaims } from '../models/Base/Jwt';

const router = express.Router();

router.get('/room/:id', [validateToken], async (req: Request, res: Response) => {
    const roomId: string = req.params.id;
    const group = await getRoom(roomId);
    res.status(200).json(group);

})

router.get('/leave/:groupId', [validateToken], async (req: Request, res: Response) => {
    const user: JwtPayloadUserClaims | null = decodeToken(req.headers['authorization']);
    if (user) {
        try {
            const groupId: string = req.params.groupId;
            if (user !== null || groupId !== 'undefined') {
                await leaveGroup(groupId, user.id);
                res.status(200).json("Group left!")
            } else {
                throw new Error("Bad request!")
            }
        } catch (err) {
            res.status(400).json(err as String);
        }
    } else {
        res.status(400).json("User could not be found!")
    }
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
    try {
        const group: INewGroup = req.body;
        await createGroup(group);
        res.status(200).json("Group sucessfully created!");
    } catch (err) {
        res.status(500).json("An error has occured!")
    }
})

export default router;