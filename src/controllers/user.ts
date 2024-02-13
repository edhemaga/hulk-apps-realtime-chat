import express, { Request, Response } from 'express';

//Model
import { IUser, IUserLogin, IUserRegistration } from '../models/User/IUser';

//Service
import { createUser, getAllUsersWithoutCurrentUser, login } from '../services/User';

//Middleware
import { emptyBodyCheck, validateToken } from './middleware/middleware';
import { getAllUserCollectiveGroups } from '../services/Group';

const router = express.Router();

router.get('/info/:id', [validateToken], async (req: Request, res: Response) => {
    const userId: string = req.params.id;

    const response = {
        persons: await getAllUsersWithoutCurrentUser(userId),
        groups: await getAllUserCollectiveGroups(userId)
    }
    res.status(200).json(response);
})

router.post('/register', [emptyBodyCheck], async (req: Request, res: Response) => {
    try {
        const user = req.body as IUserRegistration;

        if (user.password != user.confirmedPassword) {
            res.status(400).json({ message: 'Password do not match!' })
        }
        else {
            await createUser(user);
            res.status(200).json("User successfully created!");
        };
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', [emptyBodyCheck], async (req: Request, res: Response) => {
    try {
        const user = req.body as IUserLogin;
        const token = await login(user.username, user.password);
        res.status(200).json(token);

    } catch (err) {
        res.status(401).json("Access could not be granted!");
    }
});

export default router;