import { NextApiRequest, NextApiResponse } from "next";
import { Product } from ".";
import { getCollectionByName } from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const collection = await getCollectionByName<Product>("products");
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
        res.json({ data: products });
    }
};
