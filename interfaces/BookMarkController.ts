import {Request, Response} from "express";

export default interface BookMarkControllerI {
    findAllUsersThatBookMarkedTuit (req: Request, res: Response): void;
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;
    userBookmarkedTuit (req: Request, res: Response): void;
    userUnBookMarksTuit (req: Request, res: Response): void;
};