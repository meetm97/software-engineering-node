import mongoose, {Schema} from "mongoose";
import BookMark from "../models/BookMark";

const BookMarkSchema = new mongoose.Schema<BookMark>({
    tuit: {type: Schema.Types.ObjectId, ref: "BookMarkModel"},
    BookMarkedBy: {type: Schema.Types.ObjectId, ref: "BookMarkModel"},
}, {collection: "bookmark"});
export default BookMarkSchema;