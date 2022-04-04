import { Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export interface ContactItem {
    _id: string;
    key: string;
    name: string;
    value: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("hard-shop");
    const collection = db.collection("contact");
    if (req.method === "GET") {
        res.json(await getAllContactInfo(collection));
    } else if (req.method === "POST") {
        res.json(await addOneContactInfo(req, collection));
    } else if (req.method === "PUT") {
        res.json(await editOneContactInfo(req, collection));
    }
};

const getAllContactInfo = async (colletion: Collection) => {
    const contactInfo = await colletion.find({}).toArray();
    return { data: contactInfo };
};

const addOneContactInfo = async (
    req: NextApiRequest,
    collection: Collection
) => {
    const contactInfo = req.body;
    const savedContactInfo = await collection.insertOne(contactInfo);
    return { data: savedContactInfo };
};

const editOneContactInfo = async (
    req: NextApiRequest,
    collection: Collection
) => {
    const { key, value } = req.body;
    const savedContactInfo = await collection.findOneAndUpdate(
        { key },
        {
            $set: {
                value
            }
        }
    );
    return { data: savedContactInfo };
};
