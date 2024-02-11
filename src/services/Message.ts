import { Group } from "../models/Group/IGroup";
import { IMessage, Message } from "../models/Message/IMessage";

export const createMessage = (message: Partial<IMessage>) => {
    const { content, senderId, groupId } = message;

    try {
        const newMessage = new Message({
            groupId,
            content,
            senderId
        });
        Group.findByIdAndUpdate(
            groupId,
            { $push: { messages: newMessage } },
            { new: true },
        );

    } catch (error) {
        //TODO Add logging
        console.error('Error saving user:', error);
    }
}