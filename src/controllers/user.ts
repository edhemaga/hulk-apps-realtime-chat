import express, { Request, Response } from 'express';

//Model
import { IGroup } from '../models/Group/IGroup';
import { IUser, IUserLogin, IUserRegistration } from '../models/User/IUser';

//Service
import { createUser, getAllUsers, login } from '../services/User';

//Middleware
import { emptyBodyCheck } from './middleware/middleware';

const router = express.Router();

router.get('/info', async (req: Request, res: Response) => {
    const response = {
        persons: await getAllUsers(),
        groups: []
    }
    res.status(200).json(response);
})

router.post('/register', [emptyBodyCheck], async (req: Request, res: Response) => {
    try {
        const user = req.body as IUserRegistration;

        if (user.password != user.confirmedPassword) res.status(400).json({ message: 'Password do not match!' });

        await createUser(user);
        res.status(200).json("User successfully created!");
    } catch (err) {
        res.status(400).json(err);
    }

});

router.post('/login', [emptyBodyCheck], async (req: Request, res: Response) => {
    const user = req.body as IUserLogin;
    const token = await login(user.username, user.password);
    if (token)
        res.status(200).json(token);
    else
        res.status(401).json("Access could not be granted!");
});

export default router;