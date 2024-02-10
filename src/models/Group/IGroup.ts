import mongoose from "mongoose";

import { IBase } from "../Base/IBase";
import { IMessage, Message } from "../Message/IMessage";

export interface IGroup extends IBase {
    name: string;
    messages: IMessage[];
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
    messages: [
        { type: Message.schema }
    ],
});