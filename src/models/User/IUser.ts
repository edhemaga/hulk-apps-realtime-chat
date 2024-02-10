import mongoose from "mongoose";

import { IBase } from "../Base/IBase";


export interface IUser extends IBase {
    name: string;
    surname: string;
    dob: Date;
    email: string;
    password: string;
    groups: string[];
}

const userSchema = new mongoose.Schema({
    isDeleted: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: false
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

export const User = mongoose.model('User', userSchema);

export interface IUserRegistration extends IUser {
    confirmedPassword: string;
}

export interface IUserLogin {
    username: string;
    password: string;
}