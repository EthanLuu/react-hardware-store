import { Descriptions, Image } from "antd";
import { ReactElement } from "react";
import { Layout } from "../components/Layout";
import clientPromise from "../lib/mongodb";
import { api } from "../lib/api";

export default function Contact({ contacts }) {
    return (
        <>
            <div className="py-4 pt-2 pb-6 font-bold text-3xl">
                张家港市东鑫电器商行
            </div>
            <Descriptions
                bordered
                layout="vertical"
                column={{ xs: 1, sm: 1, md: 2 }}
                className="max-w-4xl flex-auto"
                labelStyle={{ fontWeight: 600, fontSize: "1rem" }}
            >
                {contacts.map((item) => (
                    <Descriptions.Item
                        key={item.key}
                        label={item.name}
                        className="bg-white"
                    >
                        {item.value}
                    </Descriptions.Item>
                ))}
                <Descriptions.Item
                    label="地图导航"
                    className="bg-white cursor-pointer"
                >
                    <a
                        className="flex justify-center items-center"
                        target={"_blank"}
                        href="https://j.map.baidu.com/df/6Zs"
                    >
                        <img
                            className="max-w-md object-cover h-full"
                            src="https://cdn.ethanloo.cn/img/202111281358048.png"
                            alt="map"
                        />
                    </a>
                </Descriptions.Item>
                <Descriptions.Item label="微信二维码" className="bg-white">
                    <div className="flex justify-center items-center">
                        <Image
                            className="max-w-md"
                            src="https://cdn.ethanloo.cn/img/202203271450824.png"
                            alt="qrcode"
                        />
                    </div>
                </Descriptions.Item>
            </Descriptions>
        </>
    );
}

export async function getServerSideProps() {
    await clientPromise;
    const { data: contactsData } = await api.get("/shopinfo/contact");
    const { data: contacts = [] } = contactsData;
    return {
        props: { contacts }
    };
}

Contact.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
