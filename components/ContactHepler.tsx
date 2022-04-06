import { Popover } from "antd";
import {
    PhoneOutlined,
    WechatOutlined,
    ToTopOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { api } from "../lib/api";

export const ContactHelper = () => {
    const [phone, setPhone] = useState("");
    const wechatImage = "https://cdn.ethanloo.cn/img/202203271450824.png";

    useEffect(() => {
        api.get("/shopinfo/contact")
            .then((res) => res.data)
            .then((contactData) => {
                contactData.data?.map((item) => {
                    if (item.key === "phone") {
                        setPhone(item.value);
                    }
                });
            });
    }, []);

    const backToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div
            style={{ fontSize: "12px" }}
            className="border fixed bottom-20 right-0 flex flex-col bg-white bg-opacity-80 z-50"
        >
            <Popover
                placement="left"
                title="咨询热线"
                content={<span className="text-2xl">{phone}</span>}
            >
                <div className="flex flex-col cursor-pointer p-2 border-b">
                    <PhoneOutlined className="text-xl mb-1" />
                    电话咨询
                </div>
            </Popover>
            <Popover
                placement="left"
                title="微信二维码"
                content={<img src={wechatImage} className="w-48" />}
            >
                <div className="flex flex-col cursor-pointer p-2 border-b">
                    <WechatOutlined className="text-xl mb-1" />
                    微信咨询
                </div>
            </Popover>
            <div
                onClick={backToTop}
                className="flex flex-col cursor-pointer p-2 justify-center items-center"
            >
                <ToTopOutlined className="text-xl mb-1" />
                返回顶部
            </div>
        </div>
    );
};
