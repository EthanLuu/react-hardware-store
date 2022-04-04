import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Product } from ".";
import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("hard-shop");
    const collection = db.collection<Product>("products");
    if (req.method === "GET") {
        const product = await collection.findOne({
            _id: new ObjectId(req.query.id as string)
        });
        res.json({
            data: product
        });
    } else if (req.method === "POST") {
        const product = await collection.findOneAndUpdate(
            {
                _id: new ObjectId(req.query.id as string)
            },
            {
                $set: {
                    title: req.body.title,
                    brand: req.body.brand,
                    category: req.body.category,
                    image: req.body.image,
                    inCarousel: req.body.inCarousel,
                    note: req.body.note
                }
            }
        );
        res.json(product);
    }
};
