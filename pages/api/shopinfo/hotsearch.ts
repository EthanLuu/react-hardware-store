import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { ResponseCode } from "../../../lib/api";
import { authMiddleware } from "../../../lib/middlewares";
import { getCollectionByName } from "../../../lib/mongodb";

export interface HotSearchItem {
    _id?: string;
    key: string;
}

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>();

apiRoute.use(authMiddleware);

apiRoute.get(async (req, res) => {
    const collection = await getCollectionByName("hotsearch");
    const hotsearches = await collection.find({}).toArray();
    res.json({
        code: ResponseCode.Success,
        data: hotsearches
    });
});

apiRoute.post(async (req, res) => {
    const collection = await getCollectionByName<HotSearchItem>("hotsearch");
    const { key } = req.body;
    if (!key) {
        res.json({
            code: ResponseCode.Fail,
            message: "请确保关键词不为空"
        });
    }
    const result = await collection.insertOne({ key: req.body.key });
    res.json({
        code: ResponseCode.Success,
        data: result
    });
});

apiRoute.delete(async (req, res) => {
    const collection = await getCollectionByName("hotsearch");
    const { key } = req.query;
    if (!key) {
    }
    const result = await collection.deleteMany({ key });
    res.json({
        code: ResponseCode.Success,
        data: result
    });
});

export default apiRoute;
