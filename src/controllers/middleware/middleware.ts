import { Request, Response, NextFunction } from "express";

export const emptyBodyCheck = (req: Request, res: Response, next: NextFunction) => {
    const emptyBody =
        (!req.body || Object.keys(req.body).length == 0) ?? false;

    if (emptyBody)
        return res
            .status(400)
            .json({ message: "No data body provided!" });
    next();
}