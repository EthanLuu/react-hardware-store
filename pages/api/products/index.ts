import { Collection, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("hard-shop");
    const collection = db.collection<Product>("products");
    if (req.method === "GET") {
        if (req.query?.inCarousel) {
            res.json(await getCarouselProducts(collection));
        } else {
            res.json(await getAllProducts(req, collection));
        }
    } else if (req.method === "POST") {
        res.json(await addOneProduct(req, collection));
    } else if (req.method === "DELETE") {
        res.json(await deleteProductById(req, collection));
    }
};

const getCarouselProducts = async (colletion: Collection<Product>) => {
    const products = await colletion.find({ inCarousel: true }).toArray();
    return {
        data: products
    };
};

const getAllProducts = async (
    req: NextApiRequest,
    colletion: Collection<Product>
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
    const products = await colletion
        .find(filter)
        .skip(skip)
        .limit(limit)
        .toArray();
    const count = (await colletion.find(filter).toArray()).length;
    return {
        data: products,
        count
    };
};

const addOneProduct = async (
    req: NextApiRequest,
    colletion: Collection<Product>
) => {
    const product = req.body;
    const savedProduct = await colletion.insertOne(product);
    return { data: savedProduct };
};

const deleteProductById = async (
    req: NextApiRequest,
    colletion: Collection<Product>
) => {
    const id = req.body.id;
    const product = await colletion.findOneAndDelete({ _id: new ObjectId(id) });
    return { data: product };
};
