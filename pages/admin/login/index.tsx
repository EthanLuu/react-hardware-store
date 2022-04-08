import { Button, Form, Input, Layout, message } from "antd";
import { useRouter } from "next/router";
import { useAccountContext } from "../../../contexts/AccountContext";
import { api } from "../../../lib/api";

export default function Login() {
    const [form] = Form.useForm();
    const router = useRouter();
    const { user, login } = useAccountContext();
    const handleSubmit = async () => {
        const { username = "", password = "" } = form.getFieldsValue();
        try {
            const { data } = await api.post("/user/login", {
                username,
                password
            });
            if (data) {
                login(data);
                router.push("/admin");
            }
        } catch (error) {
            message.error("用户名或密码错误");
        }
    };
    return (
        <Layout.Content className="h-screen bg-slate-200 flex flex-col justify-center items-center">
            <h1 className="text-2xl m-8 font-bold">东鑫商行后台管理</h1>
            <Form
                className="w-96"
                title="管理后台登陆"
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
            >
                <Form.Item label="用户名" name="username" required>
                    <Input></Input>
                </Form.Item>
                <Form.Item label="密码" name="password" required>
                    <Input type={"password"}></Input>
                </Form.Item>
            </Form>
            <Button type="primary" onClick={handleSubmit}>
                登陆
            </Button>
        </Layout.Content>
    );
}
