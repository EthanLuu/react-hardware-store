import { ReactElement } from "react";
import { Auth } from "../../components/Auth";
import { AdminLayout } from "../../components/Layout";

export default function Index() {
    return <h1>欢迎访问东鑫电器商城后台</h1>;
}

Index.getLayout = function getLayout(page: ReactElement) {
    return (
        <Auth>
            <AdminLayout>{page}</AdminLayout>
        </Auth>
    );
};
