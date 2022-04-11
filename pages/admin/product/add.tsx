import { Button, Form, Input, message, PageHeader, Switch, Upload } from "antd";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { AdminLayout } from "../../../components/Layout";
import { UploadOutlined } from "@ant-design/icons";
import { compressImageFile, normFile } from "../../../lib/utils";
import { Auth } from "../../../components/Auth";
import { api } from "../../../lib/api";

export default function AddProduct() {
    const router = useRouter();
    const [form] = Form.useForm();
    const handleSubmit = async (values: any) => {
        const product = {
            title: values.title,
            brand: values.brand,
            category: values.category,
            image:
                values.upload?.length > 0
                    ? `/uploads/${values.upload[0].name}`
                    : "",
            inCarousel: values.inCarousel,
            note: values.note
        };
        const { data } = await api.post("/products", product);
        if (data) {
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
