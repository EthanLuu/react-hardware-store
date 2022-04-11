import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { ResponseCode } from "../../../lib/api";
import { authMiddleware } from "../../../lib/middlewares";
import { getCollectionByName } from "../../../lib/mongodb";

export interface ContactItem {
    _id: string;
    key: string;
    name: string;
    value: string;
}

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>();

apiRoute.use(authMiddleware);

apiRoute.get(async (req, res) => {
    const collection = await getCollectionByName("contact");
    const contacts = await collection.find({}).toArray();
    res.json({
        code: ResponseCode.Success,
        data: contacts
    });
});

apiRoute.post(async (req, res) => {
    const collection = await getCollectionByName("contact");
    const result = await collection.insertOne(req.body);
    res.json({
        code: ResponseCode.Success,
        data: result
    });
});

apiRoute.put(async (req, res) => {
    const collection = await getCollectionByName("contact");
    const { key = "", value = "" } = req.body;
    const result = await collection.findOneAndUpdate(
        { key },
        {
            $set: {
                value
            }
        }
    );
    res.json({
        code: ResponseCode.Success,
        data: result
    });
});

export default apiRoute;
