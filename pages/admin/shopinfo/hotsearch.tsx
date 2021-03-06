import {
    Button,
    Form,
    Input,
    List,
    message,
    Modal,
    PageHeader,
    Popconfirm,
    Typography
} from "antd";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { Auth } from "../../../components/Auth";
import { AdminLayout } from "../../../components/Layout";
import { api, ResponseCode } from "../../../lib/api";
import clientPromise from "../../../lib/mongodb";
import { HotSearchItem } from "../../api/shopinfo/hotsearch";

export default function HotSearch({
    hotsearches
}: {
    hotsearches: HotSearchItem[];
}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const handleSubmit = async () => {
        const key = form.getFieldValue("key");
        if (!key) {
            message.warning("请确认输入关键词不为空！");
            return;
        }
        const { data } = await api.post("/shopinfo/hotsearch", { key });
        if (data?.code === ResponseCode.Success) {
            message.success("添加成功");
            router.reload();
            setIsModalVisible(false);
        } else {
            message.warning(`添加失败，${data.message}`);
        }
    };

    const handleDelete = async (item: HotSearchItem) => {
        const { data } = await api.delete("/shopinfo/hotsearch", {
            params: {
                key: item.key
            }
        });
        if (data?.code === ResponseCode.Success) {
            message.success("删除成功");
            router.reload();
        } else {
            message.error("删除失败");
        }
    };

    const deleteAll = async () => {
        const { data } = await api.delete("/shopinfo/hotsearch");
        if (data?.code === ResponseCode.Success) {
            message.success("删除成功");
        } else {
            message.error("删除失败");
        }
    };

    const router = useRouter();
    return (
        <div className="w-full">
            <PageHeader title="热门搜索" onBack={router.back} />
            <div className="flex w-full flex-col gap-4 justify-center items-center">
                <div>
                    <Button
                        type="primary"
                        className="max-w-min"
                        onClick={() => {
                            setIsModalVisible(true);
                        }}
                    >
                        添加
                    </Button>
                    <Popconfirm title="确认清空吗？" onConfirm={deleteAll}>
                        <Button
                            danger
                            type="primary"
                            className="max-w-min ml-2"
                        >
                            清空
                        </Button>
                    </Popconfirm>
                </div>

                <List
                    bordered
                    className="w-full max-w-sm"
                    dataSource={hotsearches}
                    renderItem={(item: { _id: string; key: string }) => (
                        <List.Item key={item._id}>
                            <Typography.Text>{item.key}</Typography.Text>
                            <Popconfirm
                                title="是否确认删除该关键词？"
                                onConfirm={() => handleDelete(item)}
                            >
                                <Button danger>删除</Button>
                            </Popconfirm>
                        </List.Item>
                    )}
                ></List>
            </div>
            <Modal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleSubmit}
                title="添加关键词"
            >
                <Form form={form}>
                    <Form.Item name={"key"} label="关键词">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

HotSearch.getLayout = function getLayout(page: ReactElement) {
    return (
        <Auth>
            <AdminLayout>{page}</AdminLayout>
        </Auth>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    await clientPromise;
    const hotsearchURI = `${process.env.API_BASE}/shopinfo/hotsearch`;
    const response = await fetch(hotsearchURI);
    const hotsearches = (await response.json()).data;
    return {
        props: {
            hotsearches,
            hotsearchURI
        }
    };
};
