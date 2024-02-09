import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

export const login = (username: string, password: string) => {
    if (username == "edim" && password == "123")
        return createToken(username, password);
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