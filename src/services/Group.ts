import { Group, IGroup, INewGroup } from "../models/Group/IGroup";

export const getRoom = async (roomId: string): Promise<IGroup | null> => {
    const group: IGroup | null = await Group.findById(roomId);
    return group;
}

export const getSingleGroup = async (senderId: string, receiverId: string): Promise<IGroup | undefined> => {

    const groupMembers = [senderId, receiverId];
    // $Where is not allowed in free atlas tier, so filtering will be done in the code
    // const group = await Group.findOne(
    //     {
    //         members: { $all: groupMembers },
    //         $where: `this.members.length < 2`
    //     }
    // );

    const groups: IGroup[] = await Group.find({ members: { $all: [...groupMembers] } });
    const group: IGroup = groups.find((arg: IGroup) => arg.members.length = 2) as IGroup;

    //TODO Add error handling if group is undefined or empty 
    if (!group) {
        const newGroup = new Group({
            isDeleted: false,
            name: `${senderId}, ${receiverId}`,
            members: [...groupMembers],
        });

        return await newGroup.save();
    }

    return group;
}

const getCollectiveGroup = async (groupMembers: string[]): Promise<IGroup[]> => {
    // As with the previous function, $where is also not avaliable in free tier
    const groups = await Group.find({ members: { $all: [...groupMembers] } });

    return groups.filter((arg: IGroup) => arg.members.length > 2);
}

export const getAllUserCollectiveGroups = async (groupMember: string): Promise<IGroup[]> => {
    const groups = await Group.find({ members: { $in: [groupMember] } });

    return groups.filter((arg: IGroup) => arg.members.length > 2);
}

export const createGroup = async (newGroup: INewGroup) => {
    if (!newGroup.name || newGroup.members?.length == 0) return;
    //If the group already exists do not create new group
    const groupExists = (await getCollectiveGroup(newGroup.members)).length != 0 ? true : false;
    if (!groupExists) {
        const group = new Group({
            isDeleted: false,
            name: newGroup.name,
            members: [...newGroup.members],
            messages: []
        })
        await group.save();
    }
}