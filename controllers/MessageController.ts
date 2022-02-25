/**
 * @file Controller RESTful Web service API for follow resource
 */
 import {Express, Request, Response} from "express";
 import MessageDao from "../daos/MessageDao";
 import MessageControllerI from "../interfaces/MessageController";

 export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:userid/messagesent", MessageController.messageController.findAllMessagesSentByUser);
            app.get("/api/users/:uid/messagesreceived", MessageController.messageController.findAllMessagesReceivedByUser);
            app.post("/api/users/:userid/sendmessage/:uid", MessageController.messageController.userSendsMessage);
            app.delete("/api/users/:userid/deletemessage/:uid", MessageController.messageController.userDeletesMessage);
        }
        return MessageController.messageController;
    }
     
    private constructor() {}

    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.userid)
            .then(messagessent => res.json(messagessent));
 

    findAllMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesReceivedByUser(req.params.uid)
            .then(messagesreceived => res.json(messagesreceived));

    userSendsMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userSendsMessage(req.params.userid, req.params.uid,req.body)
            .then(messagesent => res.json(messagesent));

    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.userid, req.params.uid)
            .then((status) => res.json(status));
 }