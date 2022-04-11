import { NextApiRequest, NextApiResponse } from "next";
import { ResponseCode } from "../../../lib/api";
import { getCollectionByName } from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const collection = await getCollectionByName("products");
    const categories = await collection.distinct("category");
    const brands = await collection.distinct("brand");
    res.json({
        code: ResponseCode.Success,
        data: {
            categories,
            brands
        }
    });
};
