import { IBase } from "../Base/IBase";

import mongoose from "mongoose";

export interface IMessage extends IBase {
    senderId: string;
    groupId: string;
    content: string;
}

const messageSchema = new mongoose.Schema<IMessage>({
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
    senderId: {
        type: String,
        required: true
    },
    groupId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
});

export const Message = mongoose.model('Message', messageSchema);
