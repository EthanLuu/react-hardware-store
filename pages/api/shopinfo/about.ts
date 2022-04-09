import { Collection, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { authMiddleware } from "../../../lib/middlewares";
import clientPromise from "../../../lib/mongodb";

export interface AboutItem {
    _id: string;
    title: string;
    rows: string[];
}

const apiRoute = nc<NextApiRequest, NextApiResponse>();

apiRoute.use(authMiddleware);

apiRoute.get(async (req, res) => {
    const client = await clientPromise;
    const db = client.db("hard-shop");
    const collection = db.collection("about");
    const about = await collection.findOne({});
    res.json({
        code: 0,
        data: about
    });
});

apiRoute.post(async (req, res) => {
    const client = await clientPromise;
    const db = client.db("hard-shop");
    const collection = db.collection("about");
    const result = await collection.insertOne(req.body);
    res.json({ code: 0, data: result });
});

apiRoute.put(async (req, res) => {
    const client = await clientPromise;
    const about = req.body;
    const db = client.db("hard-shop");
    const collection = db.collection("about");
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
    res.json({ code: 0, data: result });
});

export default apiRoute;
