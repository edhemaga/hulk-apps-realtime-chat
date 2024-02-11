import mongoose from "mongoose";

import { IBase } from "../Base/IBase";
import { IMessage, Message } from "../Message/IMessage";

export interface IGroup extends IBase {
    name: string;
    messages: IMessage[];
    members: string[];
}

const groupSchema = new mongoose.Schema<IGroup>({
    isDeleted: {
        type: Boolean,
        required: true
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
    name: {
        type: String,
        required: true
    },
    members: {
        type: [String],
        required: false,
        default: []
    },
    messages: [
        {
            type: [Message.schema],
            required: false,
            default: []
        },
    ],
});

export const Group = mongoose.model('Group', groupSchema);
