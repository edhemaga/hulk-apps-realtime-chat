import { IBase } from "../Base/IBase";
import { IMessage } from "../Message/IMessage";

export interface IUser extends IBase {
    name: string;
    surname: string;
    dob: Date;
    email: string;
    password: string;
    messages: IMessage[];
}

export interface IUserRegistration extends Partial<IUser> {
    confirmedPassword: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}