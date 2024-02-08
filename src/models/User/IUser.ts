export interface IUser {
    name: string;
    surname: string;
    dob: Date;
    email: string;
    password: string;
}

export interface IUserRegistration extends IUser {
    confirmedPassword: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}