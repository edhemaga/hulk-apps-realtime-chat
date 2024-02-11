import { Group, IGroup } from "../models/Group/IGroup";

export const getGroup = async (senderId: string, receiverId: string): Promise<IGroup> => {

    const groupMembers = [senderId, receiverId];
    const group = await Group.findOne({ members: { $in: [...groupMembers] } });
    //TODO Add error handling if group is undefined or empty 
    if (!group) {
        const newGroup = new Group({
            isDeleted: false,
            name: `${senderId}, ${receiverId}`,
            members: [...groupMembers],
        });

        return newGroup.save();
    }
    return group;
}

export const getCollectiveGroup = async (groupMembers: string[]): Promise<IGroup[]> => {

    const group = await Group.find({ members: { $in: groupMembers } });

    if (group.length === 0) {
        const newGroup = new Group({
            isDeleted: false,
            name: groupMembers.map((member) => {
                return `${member}`
            }),
            members: [...groupMembers],
        });
        newGroup.save();
    }
    return group;
}