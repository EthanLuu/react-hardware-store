import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Product } from ".";
import { getCollectionByName } from "../../../lib/mongodb";
import nextConnect from "next-connect";
import { authMiddleware } from "../../../lib/middlewares";

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onNoMatch(req, res) {
        res.status(404).end("page not found");
    }
});

apiRoute.use(authMiddleware);

apiRoute.get(async (req, res) => {
    const collection = await getCollectionByName<Product>("products");
    const product = await collection.findOne({
        _id: new ObjectId(req.query.id as string)
    });
    res.json({
        code: 0,
        data: product
    });
});

apiRoute.post(async (req, res) => {
    const collection = await getCollectionByName<Product>("products");
    const result = await collection.findOneAndUpdate(
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
    res.json({
        code: 0,
        data: result
    });
});

apiRoute.delete(async (req, res) => {
    const collection = await getCollectionByName<Product>("products");
    const result = await collection.findOneAndDelete({
        _id: new ObjectId(req.query.id as string)
    });
    res.json({
        code: 0,
        data: result
    });
});

export default apiRoute;
