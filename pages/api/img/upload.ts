import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/uploads",
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    })
});

const apiRoute = nc<NextApiRequest, NextApiResponse>({
    onNoMatch(req, res) {
        res.status(404).end("page not found");
    }
});

const uploadMiddleware = upload.single("image");

apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
    res.status(200).json({
        message: "success"
    });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    }
};
