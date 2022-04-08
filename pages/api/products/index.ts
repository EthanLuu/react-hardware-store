import { Collection, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
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

const apiRoute = nc<NextApiRequest, NextApiResponse>({
    onNoMatch(req, res) {
        res.status(404).end("page not found");
    }
});

apiRoute.use(authMiddleware);

apiRoute.get(async (req, res) => {
    const client = await clientPromise;
    const db = client.db("hard-shop");
    const products = db.collection<Product>("products");
    if (req.query?.inCarousel) {
        res.json(await getCarouselProducts(products));
    } else if (req.query?.skip && req.query?.limit) {
        res.json(await getProductsByPage(req, products));
    } else {
        res.json(await getAllProducts(products));
    }
});

apiRoute.post(async (req, res) => {
    const client = await clientPromise;
    const db = client.db("hard-shop");
    const products = db.collection<Product>("products");
    res.json(await addOneProduct(req, products));
});

apiRoute.delete(async (req, res) => {
    const client = await clientPromise;
    const db = client.db("hard-shop");
    const products = db.collection<Product>("products");
    res.json(await deleteProductById(req, products));
});

export default apiRoute;

const getCarouselProducts = async (colletion: Collection<Product>) => {
    const products = await colletion.find({ inCarousel: true }).toArray();
    return { data: products };
};

const getAllProducts = async (collection: Collection<Product>) => {
    const products = await collection.find({}).toArray();
    return {
        data: products
    };
};

const getProductsByPage = async (
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

const deleteProductById = async (
    req: NextApiRequest,
    colletion: Collection<Product>
) => {
    const id = req.body.id;
    const product = await colletion.findOneAndDelete({ _id: new ObjectId(id) });
    return { data: product };
};
