import { Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export interface HotSearchItem {
    _id: string;
    key: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("hard-shop");
    const collection = db.collection("hotsearch");
    if (req.method === "GET") {
        res.json(await getAllHotSearch(collection));
    } else if (req.method === "POST") {
        res.json(await addOneHotSearch(req, collection));
    } else if (req.method === "DELETE") {
        res.json(await deleteHotSearch(req, collection));
    }
};

const getAllHotSearch = async (colletion: Collection) => {
    const hotsearches = await colletion.find({}).toArray();
    return { data: hotsearches };
};

const addOneHotSearch = async (req: NextApiRequest, collection: Collection) => {
    const hotsearch = { key: req.body.key };
    const savedHotsearch = await collection.insertOne(hotsearch);
    return { data: savedHotsearch };
};

const deleteHotSearch = async (req: NextApiRequest, collection: Collection) => {
    let data;
    if (req.body.key) {
        data = await collection.deleteMany({ key: req.body.key });
    } else {
        data = await collection.deleteMany({});
    }
    return { data };
};
