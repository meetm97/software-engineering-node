
import mongoose, {Schema} from "mongoose";
import BookMark from "../models/BookMark";

const BookMarkSchema = new mongoose.Schema<BookMark>({
    bookMarkedTuit: {type: Schema.Types.ObjectId, ref: "BookMarkModel"},
    bookMarkedBy: {type: Schema.Types.ObjectId, ref: "BookMarkModel"},
}, {collection: "bookmark"});
export default BookMarkSchema;