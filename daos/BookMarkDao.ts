import BookMarkDaoI from "../interfaces/BookMarkDao";
import BookMarkModel from "../mongoose/BookMarkModel";
import BookMark from "../models/BookMark";
export default class BookMarkDao implements BookMarkDaoI {
    private static bookmarkDao: BookMarkDao | null = null;
    public static getInstance = (): BookMarkDao => {
        if(BookMarkDao.bookmarkDao === null) {
            BookMarkDao.bookmarkDao = new BookMarkDao();
        }
        return BookMarkDao.bookmarkDao;
    }
    private constructor() {}
    findAllUsersThatBookMarkedTuit = async (tid: string): Promise<BookMark[]> =>
        BookMarkModel
            .find({bookMarkedTuit: tid})
            .populate("bookMarkedBy")
            .exec();
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<BookMark[]> =>
    BookMarkModel
            .find({bookMarkedBy: uid})
            .populate("bookMarkedTuit")
            .exec();
    userBookmarkedTuit = async (uid: string, tid: string): Promise<any> =>
    BookMarkModel.create({bookMarkedTuit: tid, bookMarkedBy: uid});
    userUnBookMarksTuit = async (uid: string, tid: string): Promise<any> =>
    BookMarkModel.deleteOne({bookMarkedTuit: tid, bookMarkedBy: uid});
}