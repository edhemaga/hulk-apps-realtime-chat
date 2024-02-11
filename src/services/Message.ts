import { Group, IGroup } from "../models/Group/IGroup";
import { IMessage, Message } from "../models/Message/IMessage";

export const createMessage = async (message: Partial<IMessage>) => {
    const { content, senderId, groupId } = message;

    try {

        const newMessage = new Message({
            groupId,
            content,
            senderId
        });

        await Group.findByIdAndUpdate(
            groupId,
            { $push: { messages: newMessage } },
            { new: true },
        );

    } catch (error) {
        //TODO Add logging
        console.error('Error saving user:', error);
    }
}

export const getMessagesForGroup = async (groupId: string) => {
    const group = await Group.findOne({ _id: groupId });
    return group?.messages;
}