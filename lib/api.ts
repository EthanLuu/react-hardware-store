import axios from "axios";

let baseURL: string;
if (process.env.NODE_ENV === "development") {
    baseURL = "http://localhost:3000/api";
} else if (process.env.NODE_ENV === "production") {
    baseURL = "https://shop.ethanloo.cn/api";
}

export const api = axios.create({
    baseURL
});
