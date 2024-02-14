import { Group, IGroup, IGroupWithUserInfo, INewGroup, IUserInfo } from "../models/Group/IGroup";
import { IUser, User } from "../models/User/IUser";

//TODO extract type
export const getRoom = async (roomId: string): Promise<IGroupWithUserInfo | null> => {
    const group: IGroup | null = await Group.findById(roomId);
    if (!group) return null;

    const users: IUser[] = await User.find({ _id: { $in: group?.members } })

    const remappedUsers = await getUserInfo(group.members);
    const response: IGroupWithUserInfo = {
        group,
        usersInfo: [...remappedUsers]
    }
    return response;
}

export const getSingleGroup = async (senderId: string, receiverId: string): Promise<IGroupWithUserInfo | undefined> => {

    const groupMembers = [senderId, receiverId];
    // $Where is not allowed in free atlas tier, so filtering will be done in the code
    // const group = await Group.findOne(
    //     {
    //         members: { $all: groupMembers },
    //         $where: `this.members.length < 2`
    //     }
    // );

    const groups: IGroup[] = await Group.find({ members: { $all: [...groupMembers] } });
    let group: IGroup = groups.find((arg: IGroup) => arg.members.length = 2) as IGroup;

    const remappedResponse = await getUserInfo(group?.members ?? []);

    //TODO Add error handling if group is undefined or empty 
    if (!group) {
        const newGroup = new Group({
            isDeleted: false,
            name: `${senderId}, ${receiverId}`,
            members: [...groupMembers],
        });

        group = await newGroup.save();
    }

    const response: IGroupWithUserInfo = {
        group,
        usersInfo: [...remappedResponse]
    }
    return response;
}

const getCollectiveGroup = async (groupMembers: string[]): Promise<IGroup[]> => {
    // As with the previous function, $where is also not avaliable in free tier
    const groups = await Group.find({ members: { $all: [...groupMembers] } });

    return groups.filter((arg: IGroup) => arg.members.length > 2);
}

const getUserInfo = async (members: string[]): Promise<IUserInfo[]> => {
    const users: IUser[] = await User.find({ _id: { $in: members } })
    return users?.map((user) => {
        return {
            id: user.id,
            fullname: `${user.name} ${user.surname}`
        }
    });
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

export const leaveGroup = async (groupId: string, userId: string) => {
    try {
        await Group.findByIdAndUpdate(
            groupId,
            { $pull: { members: userId } },
        );
    } catch (err) {
        throw new Error("An error has occured! Group could not be left!")
    }
}