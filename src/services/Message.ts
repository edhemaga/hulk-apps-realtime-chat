//Models
import { Group } from "../models/Group/IGroup";
import { IMessage, Message } from "../models/Message/IMessage";

export const createMessage = async (message: Partial<IMessage>) => {
    const { content, senderId, groupId } = message;

    try {

        const newMessage = new Message({
            groupId,
            content,
            senderId,
            createdOn: new Date()
        });

        await Group.findByIdAndUpdate(
            groupId,
            { $push: { messages: newMessage } },
            { new: true },
        );

        return newMessage;
    } catch (error) {
        throw new Error(error as string);
        //TODO Add logging
    }
}

export const getMessagesForGroup = async (groupId: string) => {
    const group = await Group.findOne({ _id: groupId });
    return group?.messages;
}