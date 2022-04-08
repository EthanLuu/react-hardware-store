import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface User {
    _id: string;
    username: string;
    password: string;
    roleNumber: number;
    token: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("hard-shop");
    const collection = db.collection("users");
    const token = req.headers.authorization;
    if (token) {
        const user = await collection.findOne({ token });
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(400).send("token失效");
        }
    }
    const { username, password } = req.body;
    const user = await collection.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(username, process.env.TOKEN_KEY);
        await collection.findOneAndUpdate(
            { username },
            {
                $set: {
                    token
                }
            }
        );
        return res.status(200).json(user);
    }
    res.status(400).send("用户名或密码错误");
};
