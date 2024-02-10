import { IBase } from "../Base/IBase";

import mongoose from "mongoose";

export interface IMessage extends IBase {
    senderId: string;
    receiverId: string;
    groupId?: string;
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
    receiverId: {
        type: String,
        required: true
    },
    groupId: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
});

export const Message = mongoose.model('Message', messageSchema);
