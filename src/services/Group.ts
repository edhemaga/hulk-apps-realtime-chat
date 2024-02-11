import { selectClasses } from "@mui/material";
import mongoose from "mongoose";
import { Group, IGroup } from "../models/Group/IGroup";

export const getGroup = async (senderId: string, receiverId: string): Promise<IGroup> => {

    const groupMembers = [senderId, receiverId];

    // $Where is not allowed in free atlas tier, so filtering will be done in the code
    // const group = await Group.findOne(
    //     {
    //         members: { $in: groupMembers },
    //         $where: `this.members.length < 2`
    //     }
    // );

    // const group = await Group.findOne({ members: { $in: [...groupMembers] } });

    const groups: IGroup[] = await Group.find({ members: { $in: [...groupMembers] } });
    const group: IGroup = groups.find((arg: IGroup) => arg.members.length = 2) as IGroup;

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

export const getCollectiveGroups = async (groupMembers: string[]): Promise<IGroup[]> => {

    // As with the previous function, $where is also not avaliable in free tier
    const groups = await Group.find({ members: { $in: groupMembers } });

    return groups.filter((arg: IGroup) => arg.members.length > 2);

}

export const createGroup = () => {

}