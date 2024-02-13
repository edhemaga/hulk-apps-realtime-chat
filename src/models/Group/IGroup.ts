import mongoose from "mongoose";

import { IBase } from "../Base/IBase";
import { IMessage, Message } from "../Message/IMessage";

export interface IGroup extends IBase {
    name: string;
    messages: IMessage[];
    members: string[];
}

export interface INewGroup {
    name: string;
    members: string[];
}

export interface IGroupWithUserInfo {
    group: IGroup,
    usersInfo: IUserInfo[]
}

export interface IUserInfo {
    id: string,
    fullname: string
}

const groupSchema = new mongoose.Schema<IGroup>({
    isDeleted: {
        type: Boolean,
        required: false,
        default: false,
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
    name: {
        type: String,
        required: true
    },
    members: [{
        type: String,
        required: false,
    }],
    messages: [
        {
            type: Message.schema,
            required: false,
        },
    ],
});

groupSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

export const Group = mongoose.model('Group', groupSchema);
