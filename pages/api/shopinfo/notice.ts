import { Collection, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export interface NoticeItem {
    _id: string;
    title: string;
    rows: string[];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("hard-shop");
    const collection = db.collection("notice");
    if (req.method === "GET") {
        res.json(await getNotice(collection));
    } else if (req.method === "POST") {
        res.json(await addNotice(req, collection));
    } else if (req.method === "PUT") {
        res.json(await saveNotice(req, collection));
    }
};

const getNotice = async (colletion: Collection) => {
    const notice = await colletion.findOne({});
    return { data: notice };
};

const addNotice = async (req: NextApiRequest, collection: Collection) => {
    const notice = req.body;
    const savedNotice = await collection.insertOne(notice);
    return { data: savedNotice };
};

const saveNotice = async (req: NextApiRequest, collection: Collection) => {
    const notice = req.body;
    const savedNotice = await collection.findOneAndUpdate(
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
    return { data: savedNotice };
};
