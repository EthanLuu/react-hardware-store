import { NextApiRequest, NextApiResponse } from "next";
import { RequestHandler } from "next-connect";
import clientPromise from "./mongodb";

export const authMiddleware: RequestHandler<
    NextApiRequest,
    NextApiResponse
> = async (req: NextApiRequest, res: NextApiResponse, next) => {
    if (req.method === "GET") {
        return next();
    }
    if (!req.headers.authorization) {
        return res.json("当前操作无权限");
    }
    const user = await (await clientPromise)
        .db("hard-shop")
        .collection("users")
        .findOne({ token: req.headers.authorization });
    if (!user || user.roleNumber !== 9) {
        return res.json("当前操作无权限");
    }
    next();
};
