import { Group } from "../models/Group/IGroup";

export const getGroup = async (senderId: string, receiverId: string) => {

    const groupMembers = [senderId, receiverId];
    const group = await Group.find({ members: { $in: [...groupMembers] } });
    //TODO Add error handling if group is undefined or empty 
    if (group?.length == 0) {
        const newGroup = new Group({
            isDeleted: false,
            name: `${senderId}, ${receiverId}`,
            members: [...groupMembers],
        });

        return newGroup.save();
    }
    return group;
}

export const getCollectiveGroup = async (groupMembers: string[]) => {

    const group = Group.find({ members: { $in: groupMembers } });

    if (!group) {
        const newGroup = new Group({
            isDeleted: false,
            name: groupMembers.map((member) => {
                return `${member}`
            }),
            members: [...groupMembers],
        });
        newGroup.save();
    }
}