import MessageDaoI from "../interfaces/MessageDao";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    findAllMessagesSentByUser = async (userid: string): Promise<Message[]> =>
        MessageModel
            .find({to: userid})
            .populate("to")
            .exec();
    findAllMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("from")
            .exec();
    userSendsMessage = async (userid: string, uid: string, message: Message): Promise<any> =>
        MessageModel.create({...message, from: userid, to: uid});
    userDeletesMessage = async (userid: string, uid: string): Promise<any> =>
        MessageModel.deleteOne({to: userid, from: uid});
}