import {
    Button,
    Form,
    Input,
    message,
    Modal,
    PageHeader,
    Table,
    TableColumnsType
} from "antd";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { Auth } from "../../../components/Auth";
import { AdminLayout } from "../../../components/Layout";
import { api, ResponseCode } from "../../../lib/api";
import clientPromise from "../../../lib/mongodb";
import { ContactItem } from "../../api/shopinfo/contact";

export default function Contact({ contacts }: { contacts: ContactItem[] }) {
    const router = useRouter();
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editItem, setEditItem] = useState<ContactItem>(null);
    const columns: TableColumnsType<ContactItem> = [
        {
            title: "标签名",
            dataIndex: "name"
        },
        {
            title: "标签值",
            dataIndex: "value"
        },
        {
            title: "操作",
            key: "action",
            render: (_, item) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setEditItem(item);
                        setIsModalVisible(true);
                    }}
                >
                    编辑
                </Button>
            )
        }
    ];

    const handleSubmit = async () => {
        const key = editItem.key;
        const value = form.getFieldValue("value");
        const { data } = await api.put("/shopinfo/contact", {
            key,
            value
        });
        data.code === ResponseCode.Success
            ? message.success("编辑成功") && setIsModalVisible(false)
            : message.error("编辑失败");
    };

    return (
        <div className="w-full">
            <PageHeader title="联系方式" onBack={router.back} />
            <Table
                bordered
                pagination={false}
                dataSource={contacts}
                columns={columns}
            />
            <Modal
                visible={isModalVisible}
                title="编辑联系方式"
                onCancel={() => setIsModalVisible(false)}
                onOk={handleSubmit}
            >
                <Form title="编辑联系方式" form={form}>
                    <Form.Item
                        label={editItem?.name}
                        name="value"
                        initialValue={editItem?.value}
                    >
                        <Input></Input>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

Contact.getLayout = function getLayout(page: ReactElement) {
    return (
        <Auth>
            <AdminLayout>{page}</AdminLayout>
        </Auth>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    await clientPromise;
    const { data: res } = await api.get("/shopinfo/contact");
    const contacts = res.data;
    return {
        props: {
            contacts
        }
    };
};
