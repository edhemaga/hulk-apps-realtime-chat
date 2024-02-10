import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

import { IUser, IUserRegistration, User } from '../models/User/IUser';

export const getAllUsers = async (): Promise<Partial<IUser>[]> => {
    try {
        const users = await User.find();
        return users.map(user => {
            return {
                id: user?.id,
                name: user.name,
                surname: user.surname,
                email: user.email
            }
        })
    } catch (error) {
        console.error('Error getting users:', error);
        return [];
    }
};

export const createUser = async (user: IUserRegistration) => {
    const { name, surname, dob, password, email } = user;

    const userFound = await userExists(email);

    if (userFound) throw new Error("User already exists");

    try {
        const newUser = new User({
            isDeleted: false,
            name,
            surname,
            dob,
            email,
            password,
        });
        newUser.save();
    } catch (error) {
        //TODO Add logging
        console.error('Error saving user:', error);
    }

}

export const login = async (email: string, password: string) => {
    try {
        const user = await User.findOne({ email, password, isDeleted: false });
        return createToken(String(user?._id), email);
    } catch (error) {
        console.error('Error finding user:', error);
        return null;
    }

}

const createToken = (id: string, email: string): string => {
    const token = jwt.sign(
        {
            id,
            email
        },
        process.env.SECRET_KEY || '',
        {
            expiresIn: '7 days',
        },
    );
    return token;
}

const userExists = async (email: string): Promise<boolean> => {
    const existingUser = await User.findOne({ email });
    return !!existingUser;
};