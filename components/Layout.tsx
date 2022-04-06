import { Layout as AntdLayout } from "antd";
import { ContactHelper } from "./ContactHepler";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { AdminSider } from "./Sider";

export const Layout = ({ children, ...props }) => {
    return (
        <AntdLayout className="min-h-screen">
            <Header />
            <AntdLayout.Content
                style={{ marginTop: "64px" }}
                className="flex flex-col p-4 sm:px-8 md:px-16 items-center"
                {...props}
            >
                {children}
            </AntdLayout.Content>
            <ContactHelper />
            <Footer />
        </AntdLayout>
    );
};

export const AdminLayout = ({ children }) => {
    return (
        <AntdLayout className="min-h-screen">
            <AdminSider />
            <AntdLayout className="flex-auto p-4 items-center bg-white">
                {children}
            </AntdLayout>
        </AntdLayout>
    );
};
