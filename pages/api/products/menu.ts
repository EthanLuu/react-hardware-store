import { NextApiRequest, NextApiResponse } from "next";
import { Product } from ".";
import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("hard-shop");
    const collection = db.collection<Product>("products");
    const categories = await collection.distinct("category");
    const brands = await collection.distinct("brand");
    res.json({
        data: {
            categories,
            brands
        }
    });
};
