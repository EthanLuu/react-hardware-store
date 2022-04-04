import { ReactElement } from "react";
import { AdminLayout } from "../../../components/Layout";

export default function Login() {
    return <div>Login</div>;
}

Login.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};
