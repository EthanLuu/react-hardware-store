import {
    Image,
    Button,
    Form,
    Input,
    message,
    Modal,
    PageHeader,
    Table,
    TableColumnsType,
    Upload,
    Popconfirm
} from "antd";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { Auth } from "../../../components/Auth";
import { AdminLayout } from "../../../components/Layout";
import { api } from "../../../lib/api";
import clientPromise from "../../../lib/mongodb";
import { CarouselItem } from "../../api/shopinfo/carousel";

export default function Carousel({ carousels }: { carousels: CarouselItem[] }) {
    const router = useRouter();
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editItem, setEditItem] = useState<CarouselItem>(null);
    const columns: TableColumnsType<CarouselItem> = [
        {
            title: "图片预览",
            dataIndex: "image",
            render: (image) => {
                return <Image src={image} className="object-cover h-48"></Image>;
            }
        },
        {
            title: "排序（越小越前）",
            dataIndex: "rank"
        },
        {
            title: "操作",
            key: "action",
            render: (_, item) => (
                <>
                    <Button
                        onClick={() => {
                            setEditItem(item);
                            setIsModalVisible(true);
                        }}
                    >
                        编辑
                    </Button>
                    <Popconfirm
                        title="确认删除？"
                        onConfirm={() => handleDelete(item)}
                    >
                        <Button type="default" className="ml-2" danger>
                            删除
                        </Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    const handleSubmit = async () => {
        const rank = form.getFieldValue("rank");
        const { data } = await api.put("/shopinfo/carousel", {
            ...editItem,
            rank: Number.parseInt(rank)
        });
        data
            ? message.success("编辑成功") && setIsModalVisible(false)
            : message.error("编辑失败");
    };

    const handleChange = async (info) => {
        const { file } = info;
        if (file?.status !== "done") return;
        const image = "/uploads/" + file.name;
        const { data } = await api.post("/shopinfo/carousel", {
            image,
            rank: 9
        });
        if (data) {
            message.success("上传成功");
            router.reload();
        } else {
            message.error("上传失败");
        }
    };

    const handleDelete = async (item: CarouselItem) => {
        const { data } = await api.delete("/shopinfo/carousel", {
            params: {
                _id: item._id
            }
        });
        if (data) {
            message.success("删除成功");
            router.reload();
        } else {
            message.error("删除失败");
        }
    };

    return (
        <div className="w-full">
            <PageHeader title="首页头图" onBack={router.back} />
            <div className="flex flex-col items-end">
                <Upload
                    className="mb-4 text-white"
                    showUploadList={false}
                    action="/api/img/upload"
                    onChange={handleChange}
                    accept="image/*"
                    name="image"
                    maxCount={1}
                >
                    <Button type="primary">上传头图</Button>
                </Upload>

                <Table
                    className="w-full"
                    bordered
                    rowKey={"_id"}
                    pagination={false}
                    dataSource={carousels}
                    columns={columns}
                />
            </div>

            <Modal
                visible={isModalVisible}
                title="编辑头图"
                onCancel={() => setIsModalVisible(false)}
                onOk={handleSubmit}
            >
                <Form title="编辑头图" form={form}>
                    <div className="flex justify-center items-center mb-6">
                        <Image
                            src={editItem?.image}
                            width={"100%"}
                            className=" object-cover"
                        ></Image>
                    </div>
                    <Form.Item
                        name="rank"
                        label="优先级"
                        initialValue={editItem?.rank}
                    >
                        <Input type={"number"}></Input>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

Carousel.getLayout = function getLayout(page: ReactElement) {
    return (
        <Auth>
            <AdminLayout>{page}</AdminLayout>
        </Auth>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    await clientPromise;
    const contactURI = `${process.env.API_BASE}/shopinfo/carousel`;
    const response = await fetch(contactURI);
    const carousels = (await response.json()).data;
    return {
        props: {
            carousels
        }
    };
};
