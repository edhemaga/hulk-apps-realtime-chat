import { IMessage, Message } from "../models/Message/IMessage";

export const createMessage = async (groupId: string, message: Partial<IMessage>) => {
    const { content, senderId } = message;

    try {
        const newMessage = new Message({
            isDeleted: false,
            groupId,
            content,
            senderId
        });
        await newMessage.save();
    } catch (error) {
        //TODO Add logging
        console.error('Error saving user:', error);
    }
}