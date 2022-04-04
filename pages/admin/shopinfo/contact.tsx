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
import { AdminLayout } from "../../../components/Layout";
import clientPromise from "../../../lib/mongodb";
import { ContactItem } from "../../api/shopinfo/contact";

export default function Contact({
    contacts,
    contactURI
}: {
    contacts: ContactItem[];
    contactURI: string;
}) {
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
        const response = await fetch(contactURI, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ key, value })
        });
        const { data } = await response.json();
        data
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
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    await clientPromise;
    const contactURI = `${process.env.API_BASE}/shopinfo/contact`;
    const response = await fetch(contactURI);
    const contacts = (await response.json()).data;
    return {
        props: {
            contacts,
            contactURI
        }
    };
};
