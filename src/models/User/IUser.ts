import mongoose from "mongoose";

import { IBase } from "../Base/IBase";


export interface IUser extends IBase {
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
    username: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    isDeleted: {
        type: Boolean,
        required: false,
        default: false
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
        required: false,
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

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

export const User = mongoose.model('User', userSchema);
