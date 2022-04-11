import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ResponseCode } from "../../../lib/api";
import { authMiddleware } from "../../../lib/middlewares";
import { getCollectionByName } from "../../../lib/mongodb";

export interface CarouselItem {
    _id?: string;
    image: string;
    rank: number;
}

const apiRoute = nc<NextApiRequest, NextApiResponse>();

apiRoute.use(authMiddleware);

apiRoute.get(async (req, res) => {
    const collection = await getCollectionByName<CarouselItem>("carousels");
    const carousels = (await collection.find({}).toArray()).sort(
        (x, y) => x.rank - y.rank
    );
    res.json({ code: ResponseCode.Success, data: carousels });
});

apiRoute.post(async (req, res) => {
    const collection = await getCollectionByName<CarouselItem>("carousels");
    const result = collection.insertOne({
        image: req.body.image,
        rank: req.body.rank || 9
    });
    res.json({
        code: ResponseCode.Success,
        data: result
    });
});

apiRoute.put(async (req, res) => {
    const collection = await getCollectionByName("carousels");
    const result = collection.findOneAndUpdate(
        {
            _id: new ObjectId(req.body._id)
        },
        {
            $set: {
                rank: req.body.rank
            }
        }
    );
    res.json({
        code: ResponseCode.Success,
        data: result
    });
});

apiRoute.delete(async (req, res) => {
    const collection = await getCollectionByName("carousels");
    const result = collection.findOneAndDelete({
        _id: new ObjectId(req.query._id as string)
    });
    res.json({
        code: ResponseCode.Success,
        data: result
    });
});

export default apiRoute;
