import { Request, Response, NextFunction } from "express";

import jwt, { JwtPayload } from 'jsonwebtoken';
import { Socket } from "socket.io";
import { JwtPayloadUserClaims } from "../../models/Base/Jwt";

export const emptyBodyCheck = (req: Request, res: Response, next: NextFunction) => {
    const emptyBody =
        (!req.body || Object.keys(req.body).length == 0) ?? false;
    if (emptyBody)
        return res
            .status(400)
            .json({ message: "No data body provided!" });
    next();
}

export const validateToken = (
    req: Request,
    res: Response,
    next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    const token = (authHeader && authHeader.split(' ')[1]) ?? null;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, (process.env.SECRET_KEY || ''), (err, user) => {
        if (err)
            return res.sendStatus(403);
        next();
    })
}

export const decodeToken = (authHeader: string | undefined): JwtPayloadUserClaims | null => {
    if (!authHeader) return null;
    const token = (authHeader && authHeader.split(' ')[1]) ?? null;

    const decoded: JwtPayloadUserClaims = jwt.verify(token, (process.env.SECRET_KEY || '')) as JwtPayloadUserClaims;
    
    if (!decoded) return null;

    return decoded;
}

export const validateTokenForSocket = (socket: Socket, next: (err?: Error) => void) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error('Authentication error'));
    }

    jwt.verify(token, process.env.SECRET_KEY || '', (err: jwt.VerifyErrors | null, decoded?: any) => {
        if (err) {
            return next(new Error('Authentication error'));
        }
        next();
    });
};