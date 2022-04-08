import { Button, Form, Input, message, PageHeader, Switch, Upload } from "antd";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { AdminLayout } from "../../../components/Layout";
import { UploadOutlined } from "@ant-design/icons";
import { normFile } from "../../../lib/utils";
import axios from "axios";
import { GetServerSideProps } from "next";
import clientPromise from "../../../lib/mongodb";
import { Auth } from "../../../components/Auth";
import { api } from "../../../lib/api";

export default function AddProduct({
    productURL,
    imageURL
}: {
    productURL: string;
    imageURL: string;
}) {
    const router = useRouter();
    const [form] = Form.useForm();
    const handleSubmit = async (values: any) => {
        const product = {
            title: values.title,
            brand: values.brand,
            category: values.category,
            image:
                values.upload?.length > 0
                    ? `${imageURL}/${values.upload[0].name}`
                    : "",
            inCarousel: values.inCarousel,
            note: values.note
        };
        const response = await api.post("/products", product);
        if (response.data) {
            message.success("添加成功");
            form.resetFields();
        } else {
            message.error("添加失败");
        }
    };
    return (
        <div className="w-full">
            <PageHeader title="添加商品" onBack={router.back}></PageHeader>
            <div className="w-full flex justify-center items-center">
                <Form form={form} onFinish={handleSubmit} className="min-w-fit">
                    <Form.Item label="名称" name="title" className="w-96">
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
                    <Form.Item
                        name="upload"
                        label="封面图片"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
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
                    <Form.Item>
                        <div className="flex w-full justify-center gap-8">
                            <Button type="primary" htmlType="submit">
                                添加
                            </Button>
                            <Button onClick={() => form.resetFields()}>
                                清空
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

AddProduct.getLayout = function getLayout(page: ReactElement) {
    return (
        <Auth>
            <AdminLayout>{page}</AdminLayout>
        </Auth>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    await clientPromise;
    const productURL = `${process.env.API_BASE}/products`;
    const imageURL = `${process.env.BASE_URL}/uploads`;
    return {
        props: {
            productURL,
            imageURL
        }
    };
};
