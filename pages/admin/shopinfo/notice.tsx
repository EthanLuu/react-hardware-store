import { Button, Form, Input, message, PageHeader } from "antd";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Auth } from "../../../components/Auth";
import { AdminLayout } from "../../../components/Layout";
import { api } from "../../../lib/api";
import clientPromise from "../../../lib/mongodb";
import { NoticeItem } from "../../api/shopinfo/notice";

export default function Notice({
    notice,
    noticeURI
}: {
    notice: NoticeItem;
    noticeURI: string;
}) {
    const [form] = Form.useForm();
    const handleSubmit = async (values: any) => {
        const newNotice = {
            ...notice,
            title: values.title,
            rows: values.content.split("\n")
        };
        try {
            const { data } = await api.put(noticeURI, {
                method: "PUT",
                body: JSON.stringify(newNotice),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (data) {
                message.success("保存成功");
            }
        } catch (error) {
            message.error(`保存失败，${error.message}`);
        }
    };
    const router = useRouter();
    const handleReset = () => {};
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
                        initialValue={notice.title}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        initialValue={notice.rows.join("\n")}
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
    const noticeURI = `${process.env.API_BASE}/shopinfo/notice`;
    const response = await fetch(noticeURI);
    const notice = (await response.json()).data;
    return {
        props: {
            notice,
            noticeURI
        }
    };
};
