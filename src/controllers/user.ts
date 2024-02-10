import express, { Request, Response } from 'express';

//Model
import { IGroup } from '../models/Group/IGroup';
import { IUser, IUserLogin, IUserRegistration } from '../models/User/IUser';

//Service
import { login } from '../services/User';

//Middleware
import { emptyBodyCheck } from './middleware/middleware';

const router = express.Router();

//DEMO
var users: Partial<IUser>[] = [
    {
        id: "1",
        isDeleted: false,
        createdOn: new Date(),
        name: "John",
        surname: "Doe",
        dob: new Date("1990-01-01"),
        email: "john.doe@example.com",
    },
    {
        id: "2",
        isDeleted: false,
        createdOn: new Date(),
        name: "Jane",
        surname: "Doe",
        dob: new Date("1985-05-15"),
        email: "jane.doe2@example.com",
    }
];

const groups: IGroup[] = [
    {
        id: "1",
        isDeleted: false,
        createdOn: new Date(),
        name: "Gizavci"
    },
    {
        id: "2",
        isDeleted: false,
        createdOn: new Date(),
        name: "Lizavci"
    }
]

router.get('/info', (req: Request, res: Response) => {
    const response = {
        persons: users,
        groups
    }
    res.status(200).json(response);
})

router.post('/register', [emptyBodyCheck], (req: Request, res: Response) => {
    const user = req.body as IUserRegistration;
    if (user.password != user.confirmedPassword) res.status(400).json({ message: 'Password do not match!' })
});

router.post('/login', [emptyBodyCheck], (req: Request, res: Response) => {
    const user = req.body as IUserLogin;
    const token = login(user.username, user.password);
    if (token)
        res.status(200).json(token);
    else
        res.status(401).json("Access could not be granted!");
});

export default router;