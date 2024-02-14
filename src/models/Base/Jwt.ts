import { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadUserClaims extends JwtPayload {
    id: string;
    email: string;
}
