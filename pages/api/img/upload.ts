import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import multer from "multer";
import { ResponseCode } from "../../../lib/api";

const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/uploads",
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    })
});

const apiRoute = nc<NextApiRequest, NextApiResponse>();

const uploadMiddleware = upload.single("image");

apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
    res.status(200).json({
        code: ResponseCode.Success
    });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    }
};
