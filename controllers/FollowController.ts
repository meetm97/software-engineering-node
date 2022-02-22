/**
 * @file Controller RESTful Web service API for follow resource
 */
 import {Express, Request, Response} from "express";
 import FollowDao from "../daos/FollowDao";
 import FollowControllerI from "../interfaces/FollowController";

 export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersThatUserFollows);
            app.get("/api/users/:uid/followed", FollowController.followController.findAllFollowersOfUsers);
            app.post("/api/users/:userid/follows/:uid", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:userid/unfollows/:uid", FollowController.followController.userUnfollowsUser);
        }
        return FollowController.followController;
    }
     
    private constructor() {}

    findAllUsersThatUserFollows = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatUserFollows(req.params.uid)
            .then(follows => res.json(follows));
 

    findAllFollowersOfUsers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowersOfUsers(req.params.uid)
            .then(followed => res.json(followed));

    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.userid, req.params.uid)
            .then(follows => res.json(follows));
    userUnfollowsUser = (req: Request, res: Response) =>
            FollowController.followDao.userUnfollowsUser(req.params.userid, req.params.uid)
                .then((status) => res.json(status));



 }