import { Collection, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getCollectionByName } from "../../../lib/mongodb";
import nc from "next-connect";
import { authMiddleware } from "../../../lib/middlewares";

export interface Product {
    _id: ObjectId;
    title: string;
    brand: string;
    category: string;
    price: number;
    image: string;
    inCarousel: boolean;
    note: string;
}

const apiRoute = nc<NextApiRequest, NextApiResponse>();

apiRoute.use(authMiddleware);

apiRoute.get(async (req, res) => {
    const collection = await getCollectionByName<Product>("products");
    if (req.query?.inCarousel) {
        res.json(await getCarouselProducts(collection));
    } else if (req.query?.skip && req.query?.limit) {
        res.json(await getProductsByPage(req, collection));
    } else {
        res.json(await getAllProducts(req, collection));
    }
});

apiRoute.post(async (req, res) => {
    const collection = await getCollectionByName<Product>("products");
    res.json(await addOneProduct(req, collection));
});

export default apiRoute;

const getCarouselProducts = async (colletion: Collection<Product>) => {
    const products = await colletion.find({ inCarousel: true }).toArray();
    return { data: products };
};

const getAllProducts = async (
    req: NextApiRequest,
    collection: Collection<Product>
) => {
    const { query } = req;
    const allowKeys = ["brand", "category"];
    let filter = {};
    for (let [key, value] of Object.entries(query)) {
        if (allowKeys.includes(key)) {
            filter[key] = value;
        }
    }
    const products = await collection.find(filter).toArray();
    const count = (await collection.find(filter).toArray()).length;
    return { data: products, count };
};

const getProductsByPage = async (
    req: NextApiRequest,
    collection: Collection<Product>
) => {
    const { query } = req;
    const allowKeys = ["brand", "category"];
    let filter = {};
    let skip = Number.parseInt(query?.skip as string) || 0;
    let limit = Number.parseInt(query?.limit as string) || 12;
    for (let [key, value] of Object.entries(query)) {
        if (allowKeys.includes(key)) {
            filter[key] = value;
        }
    }
    const products = await collection
        .find(filter)
        .skip(skip)
        .limit(limit)
        .toArray();
    const count = (await collection.find(filter).toArray()).length;
    return { data: products, count };
};

const addOneProduct = async (
    req: NextApiRequest,
    colletion: Collection<Product>
) => {
    const product = req.body;
    const savedProduct = await colletion.insertOne(product);
    return { data: savedProduct };
};
