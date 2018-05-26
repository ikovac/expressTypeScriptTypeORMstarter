import {Request, Response, NextFunction, Router} from "express";

export let index = Router();

index.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({status: "yea?"});
});