import { Divider, Layout } from "antd";
import {
    CompassOutlined,
    PhoneOutlined,
    WechatOutlined
} from "@ant-design/icons";

export const Footer = () => {
    return (
        <Layout.Footer className="flex flex-col justify-center items-center bg-slate-700 text-gray-100">
            <div className="flex justify-center items-center">
                <span>联系方式：</span>
                <div className="flex justify-center items-center mx-2">
                    <CompassOutlined className="mr-1" />
                    <span>xx省xx市xxxxx路xxxx号</span>
                </div>
                <div className="flex justify-center items-center mx-2">
                    <PhoneOutlined className="mr-1" />
                    <span>12300000000</span>
                </div>
                <div className="flex justify-center items-center mx-2">
                    <WechatOutlined className="mr-1" />
                    <span>wechat</span>
                </div>
            </div>
            <Divider className=" border-slate-200 w-full" />
            <div className="w-full flex flex-col md:flex-row justify-between">
                <div>
                    <span>
                        Copyright ©2022 张家港市东鑫电器商行 All rights
                        reserved.
                    </span>
                </div>
                <div>
                    <span> 技术支持：</span>
                    <a href="https://www.ethanloo.cn">EthanLoo</a>
                </div>
                <div>
                    <span>备案号：苏ICP备xxxx号</span>
                </div>
            </div>
        </Layout.Footer>
    );
};
