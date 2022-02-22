import FollowDaoI from "../interfaces/FollowDao";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    findAllUsersThatUserFollows = async (uid: string): Promise<Follow[]> =>
    FollowModel
        .find({userFollowing: uid})
        .populate("userFollowing")
        .exec();
    findAllFollowersOfUsers = async (uid: string): Promise<Follow[]> =>
    FollowModel
        .find({userFollowed: uid})
        .populate("userFollowed")
        .exec();
    userFollowsUser = async (userid: string, uid: string): Promise<any> =>
        FollowModel.create({userFollowing: userid, userFollowed: uid});
    userUnfollowsUser = async (userid: string, uid: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: userid, userFollowed: uid});
} 