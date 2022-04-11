import { Button, Form, Input, message, PageHeader } from "antd";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Auth } from "../../../components/Auth";
import { AdminLayout } from "../../../components/Layout";
import { api, ResponseCode } from "../../../lib/api";
import clientPromise from "../../../lib/mongodb";
import { AboutItem } from "../../api/shopinfo/about";

export default function Notice({ about }: { about: AboutItem }) {
    const [form] = Form.useForm();
    const router = useRouter();
    const handleSubmit = async (values: any) => {
        const newAbout = {
            ...about,
            title: values.title,
            rows: values.content.split("\n")
        };
        const { data: res } = await api.put("/shopinfo/about", newAbout);
        if (res?.code === ResponseCode.Success) {
            message.success("保存成功");
            router.reload();
        } else {
            message.error(`保存失败`);
        }
    };
    const handleReset = () => {
        form.setFieldsValue({
            title: about.title,
            content: about.rows.join("\n")
        });
    };
    return (
        <div className="w-full">
            <PageHeader title="首页公告" onBack={router.back} />
            <div className="w-full flex justify-center">
                <Form
                    className="w-full max-w-sm"
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        initialValue={about.title}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        initialValue={about.rows?.join("\n")}
                    >
                        <Input.TextArea rows={8} />
                    </Form.Item>
                    <Form.Item>
                        <div className="flex w-full justify-center gap-8">
                            <Button type="primary" htmlType="submit">
                                保存
                            </Button>
                            <Button onClick={handleReset}>重置</Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

Notice.getLayout = function getLayout(page: ReactElement) {
    return (
        <Auth>
            <AdminLayout>{page}</AdminLayout>
        </Auth>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    await clientPromise;
    const { data: res } = await api.get("/shopinfo/about");
    return {
        props: {
            about: res.data
        }
    };
};
