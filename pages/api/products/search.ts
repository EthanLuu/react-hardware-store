import { NextApiRequest, NextApiResponse } from "next";
import { Product } from ".";
import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("hard-shop");
    const collection = db.collection<Product>("products");
    const searchKey = req.query?.key as string;
    if (!searchKey) {
        res.json({
            data: []
        });
    } else {
        const regex = new RegExp(searchKey, "gi");
        const products = await collection
            .find({
                $or: [
                    { brand: { $regex: regex } },
                    { category: { $regex: regex } },
                    { title: { $regex: regex } }
                ]
            })
            .toArray();
        res.json({
            data: products
        });
    }
};
