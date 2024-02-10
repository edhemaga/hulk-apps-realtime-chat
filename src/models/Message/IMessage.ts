import { IBase } from "../Base/IBase";

export interface IMessage extends IBase {
    senderId: string;
    receiverId: string;
    groupId?: string;
    value: string;
}