
import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import BookMarkController from "./controllers/BookMarkController"
import FollowController from './controllers/FollowController';
import MessageController from './controllers/MessageController';
import mongoose from "mongoose";


// connect to database
const connectionString = `mongodb+srv://meet:meet1234@cluster0.zntvi.mongodb.net/myFirstDatabase?retryWrites=true`;
mongoose.connect(connectionString);

mongoose.connection.on("error", function(error) {
  console.log(error)
})

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB Database")
})


const app = express();
app.use(express.json());

app.get('/hello', (req, res) =>
res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const bookmarkController = BookMarkController.getInstance(app);
const followController = FollowController.getInstance(app);
const messageController = MessageController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);