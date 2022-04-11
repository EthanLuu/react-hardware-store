import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ResponseCode } from "../../../lib/api";
import { authMiddleware } from "../../../lib/middlewares";
import { getCollectionByName } from "../../../lib/mongodb";

export interface AboutItem {
    _id: string;
    title: string;
    rows: string[];
}

const apiRoute = nc<NextApiRequest, NextApiResponse>();

apiRoute.use(authMiddleware);

apiRoute.get(async (req, res) => {
    const collection = await getCollectionByName("about");
    const about = await collection.findOne({});
    res.json({
        code: ResponseCode.Success,
        data: about
    });
});

apiRoute.post(async (req, res) => {
    const collection = await getCollectionByName("about");
    const result = await collection.insertOne(req.body);
    res.json({ code: ResponseCode.Success, data: result });
});

apiRoute.put(async (req, res) => {
    const collection = await getCollectionByName("about");
    const about = req.body;
    const result = await collection.findOneAndUpdate(
        {
            _id: new ObjectId(about._id)
        },
        {
            $set: {
                title: about.title,
                rows: about.rows
            }
        }
    );
    res.json({ code: ResponseCode.Success, data: result });
});

export default apiRoute;
