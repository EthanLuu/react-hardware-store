import { RcFile } from "antd/lib/upload";
import axios from "axios";
import { useAccountContext } from "../contexts/AccountContext";
import { api } from "./api";

export const getTodayString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDay()}`;
};

export const getFetchUrl = (url: string, query: Object) => {
    const fetchUrl = new URL(url);
    if (query) {
        for (let [key, value] of Object.entries(query)) {
            if (key === "page") {
                fetchUrl.searchParams.set(
                    "skip",
                    (Number.parseInt(value) * 12 - 12).toString()
                );
                fetchUrl.searchParams.set("limit", "12");
            } else {
                fetchUrl.searchParams.set(key, value);
            }
        }
    }
    return fetchUrl;
};

export const mergeQueryString = (
    query = {},
    name: string,
    value: string | null
) => {
    const searchParams = new URLSearchParams(query);
    if (!value && searchParams.has(name)) {
        searchParams.delete(name);
    } else if (value) {
        searchParams.set(name, value);
    }
    return "?" + searchParams.toString();
};

export const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

export const getToken = () => {
    return localStorage.getItem("dx-token");
};

export const loginByToken = async () => {
    const token = getToken();
    if (!token) return false;
    const { data, statusText, status } = await api.post(
        "/user/login",
        {},
        {
            headers: {
                authorization: token
            }
        }
    );
    if (status !== 200) {
        return false;
    }
    return data;
};

export const compressImageFile: any = (file: RcFile) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = document.createElement("img");
            img.src = reader.result as string;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                canvas.toBlob(resolve, "image/jpeg", 0.7);
            };
        };
    });
};
