import { Popover } from "antd";
import {
    PhoneOutlined,
    WechatOutlined,
    ToTopOutlined
} from "@ant-design/icons";

export const ContactHelper = () => {
    const backToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const phone = 12345678910;
    const wechatImage = "https://cdn.ethanloo.cn/img/202203271450824.png";

    return (
        <div className="border fixed top-1/3 right-1 flex flex-col bg-white bg-opacity-80 z-50">
            <Popover
                placement="left"
                title="咨询热线"
                content={<span className="text-2xl">{phone}</span>}
            >
                <div className="flex flex-col cursor-pointer p-2 border-b">
                    <PhoneOutlined className="text-2xl mb-1" />
                    电话咨询
                </div>
            </Popover>
            <Popover
                placement="left"
                title="微信二维码"
                content={<img src={wechatImage} className="w-48" />}
            >
                <div className="flex flex-col cursor-pointer p-2 border-b">
                    <WechatOutlined className="text-2xl mb-1" />
                    微信咨询
                </div>
            </Popover>
            <div
                onClick={backToTop}
                className="flex flex-col cursor-pointer p-2"
            >
                <ToTopOutlined className="text-2xl mb-1" />
                返回顶部
            </div>
        </div>
    );
};
