import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { ResponseCode } from "../../../lib/api";
import { authMiddleware } from "../../../lib/middlewares";
import { getCollectionByName } from "../../../lib/mongodb";

export interface NoticeItem {
    _id: string;
    title: string;
    rows: string[];
}

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>();

apiRoute.use(authMiddleware);

apiRoute.get(async (req, res) => {
    const collection = await getCollectionByName("notice");
    const notice = await collection.findOne();
    res.json({
        code: ResponseCode.Success,
        data: notice
    });
});

apiRoute.put(async (req, res) => {
    const collection = await getCollectionByName("notice");
    const notice = req.body;
    const result = await collection.findOneAndUpdate(
        {
            _id: new ObjectId(notice._id)
        },
        {
            $set: {
                title: notice.title,
                rows: notice.rows
            }
        }
    );
    res.json({
        code: 0,
        data: result
    });
});

export default apiRoute;
