import { Card, List, Row } from "antd";
import {
    HeartOutlined,
    ShopOutlined,
    GoldOutlined,
    SmileOutlined
} from "@ant-design/icons";
import { AboutItem } from "../pages/api/shopinfo/about";

export const About = ({ about }: { about: AboutItem }) => {
    const cardItems = [
        {
            title: "品种多样",
            english: "Diverse Variety",
            icon: <ShopOutlined />
        },
        {
            title: "质量保证",
            english: "Quality Assurance",
            icon: <GoldOutlined />
        },
        {
            title: "服务第一",
            english: "Service First",
            icon: <HeartOutlined />
        },
        {
            title: "完善售后",
            english: "Perfect After-sales",
            icon: <SmileOutlined />
        }
    ];
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <h3 className="text-2xl font-semibold text-gray-600 mb-6">
                {about?.title || "张家港市东鑫电器商行"}
            </h3>
            <div>
                {about?.rows?.map((row, idx) => (
                    <Row key={idx} className="text-gray-500 text-lg mb-6">
                        {row}
                    </Row>
                ))}
            </div>
            <List
                className="w-full"
                grid={{
                    gutter: 16,
                    column: 4,
                    xs: 2,
                    lg: 4
                }}
                dataSource={cardItems}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            className="text-center"
                            cover={
                                <div className="text-4xl pt-4">{item.icon}</div>
                            }
                        >
                            <Card.Meta
                                title={item.title}
                                description={item.english}
                            ></Card.Meta>
                        </Card>
                    </List.Item>
                )}
            ></List>
        </div>
    );
};
