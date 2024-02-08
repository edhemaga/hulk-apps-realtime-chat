import express, { Request, Response } from 'express';
import { IUserLogin, IUserRegistration } from '../models/User/IUser';
import { emptyBodyCheck } from './middleware/middleware';

const router = express.Router();

router.post('/register', [emptyBodyCheck], (req: Request, res: Response) => {
    const user = req.body as IUserRegistration;
    if (user.password != user.confirmedPassword) res.status(400).json({ message: 'Password do not match!' })
});

router.post('/login', [emptyBodyCheck], (req: Request, res: Response) => {
    const user = req.body as IUserLogin;
    const token = 'JWT token';
    res.status(200).json(token)
});

export default router;