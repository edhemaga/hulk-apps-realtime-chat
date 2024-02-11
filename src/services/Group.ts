import { Group, IGroup } from "../models/Group/IGroup";

export const getGroup = async (senderId: string, receiverId: string): Promise<IGroup | undefined> => {

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

export const getCollectiveGroup = async (groupMembers: string[]): Promise<IGroup[]> => {

    // As with the previous function, $where is also not avaliable in free tier
    const groups = await Group.find({ members: { $all: [...groupMembers] } });

    return groups.filter((arg: IGroup) => arg.members.length > 2);

}

export const getAllUserCollectiveGroups = async (groupMember: string): Promise<IGroup[]> => {
    const groups = await Group.find({ members: { $in: [groupMember] } });

    return groups.filter((arg: IGroup) => arg.members.length > 2);
}

export const createGroup = () => {

}