import {
    Button,
    Form,
    Input,
    Image,
    message,
    Modal,
    PageHeader,
    Popconfirm,
    Switch,
    Table,
    TableColumnsType,
    Upload
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { AdminLayout } from "../../../components/Layout";
import clientPromise from "../../../lib/mongodb";
import { Product } from "../../api/products";
import axios from "axios";
import { compressImageFile, normFile } from "../../../lib/utils";
import { Auth } from "../../../components/Auth";
import { api } from "../../../lib/api";

export default function AllProduct({ products }: { products: Product[] }) {
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editItem, setEditItem] = useState<Product>(null);
    const [form] = Form.useForm();

    const categorySet = new Set<string>();
    const brandSet = new Set<string>();
    for (let p of products) {
        categorySet.add(p.category);
        brandSet.add(p.brand);
    }
    const columns: TableColumnsType<Product> = [
        {
            title: "名称",
            dataIndex: "title"
        },
        {
            title: "种类",
            dataIndex: "category",
            filters: Array.from(categorySet).reduce((pre, cur) => {
                pre.push({ text: cur, value: cur });
                return pre;
            }, []),
            onFilter: (v, item) => item.category === v
        },
        {
            title: "品牌",
            dataIndex: "brand",
            filters: Array.from(brandSet).reduce((pre, cur) => {
                pre.push({ text: cur, value: cur });
                return pre;
            }, []),
            onFilter: (v, item) => item.brand === v
        },
        {
            title: "备注",
            dataIndex: "note"
        },
        {
            title: "首页展示",
            sorter: (a, b) => (a.inCarousel ? 1 : -1),
            render: (_, item) => (
                <Switch
                    defaultChecked={item.inCarousel}
                    onClick={() => handleCarousel(item)}
                />
            )
        },
        {
            title: "图片",
            width: "164px",
            render: (_, item) => (
                <Image className="h-24 w-32 object-cover" src={item.image} />
            )
        },
        {
            title: "操作",
            render: (_, item) => (
                <div className="flex gap-2">
                    <Button
                        type="primary"
                        onClick={() => {
                            setEditItem(item);
                            setIsModalVisible(true);
                        }}
                    >
                        编辑
                    </Button>
                    <Popconfirm
                        title="是否确认删除"
                        onConfirm={() => handleDelete(item)}
                    >
                        <Button type="primary" danger>
                            删除
                        </Button>
                    </Popconfirm>
                </div>
            )
        }
    ];

    const handleDelete = async (item: Product) => {
        const { data } = await api.delete(`/products/${item._id.toString()}`);
        data ? message.success("删除成功") : message.error("删除失败");
    };

    const handleCarousel = async (item: Product) => {
        const { data } = await api.post(`/products/${item._id.toString()}`, {
            ...item,
            inCarousel: !item.inCarousel
        });
        data ? message.success("切换成功") : message.error("切换失败");
    };

    const handleSubmit = async () => {
        const { title, brand, category, upload, inCarousel, note } =
            form.getFieldsValue();
        const newProduct = {
            ...editItem,
            title,
            brand,
            category,
            inCarousel,
            note
        };
        if (upload?.length > 0) {
            newProduct.image = `/uploads/${upload[0].name}`;
        }
        const { data } = await api.post(
            `/products/${editItem._id.toString()}`,
            newProduct
        );
        data ? message.success("编辑成功") : message.error("编辑失败");
        setIsModalVisible(false);
    };

    return (
        <div className="w-full">
            <PageHeader title="所有商品" onBack={router.back} />
            <Table
                bordered
                sticky={true}
                columns={columns}
                dataSource={products}
                rowKey="_id"
                pagination={{
                    position: ["bottomRight"],
                    pageSize: 4
                }}
            ></Table>
            <Modal
                destroyOnClose={true}
                title="编辑商品信息"
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditItem(null);
                }}
                onOk={handleSubmit}
            >
                <Form form={form} initialValues={editItem}>
                    <Form.Item label="名称" name="title">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="种类" name="category">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="品牌" name="brand">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="备注" name="note">
                        <Input.TextArea></Input.TextArea>
                    </Form.Item>
                    <Form.Item label="原封面" name="oldImage">
                        <Image
                            src={editItem?.image}
                            className="h-36 w-full object-cover"
                        />
                    </Form.Item>
                    <Form.Item
                        name="upload"
                        label="新封面"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            beforeUpload={compressImageFile}
                            accept="image/*"
                            name="image"
                            listType="picture"
                            maxCount={1}
                            action="/api/img/upload"
                        >
                            <Button icon={<UploadOutlined />}>点击上传</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="首页展示"
                        name="inCarousel"
                        valuePropName="checked"
                    >
                        <Switch></Switch>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

AllProduct.getLayout = function getLayout(page: ReactElement) {
    return (
        <Auth>
            <AdminLayout>{page}</AdminLayout>
        </Auth>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    await clientPromise;
    const productURI = `${process.env.API_BASE}/products`;
    const response = await axios.get(productURI);
    const data = response.data;
    const { data: products } = data;
    return {
        props: {
            products,
            productURI
        }
    };
};
