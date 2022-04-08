import { useRouter } from "next/router";
import { Component, useEffect } from "react";
import { useAccountContext } from "../contexts/AccountContext";
import { loginByToken } from "../lib/utils";

export const Auth = ({ children }) => {
    const { user, isAdmin, login } = useAccountContext();
    const router = useRouter();
    useEffect(() => {
        loginByToken().then((res) => {
            if (res) {
                login(res);
            }
            if (res?.roleNumber !== 9) {
                router.push("/admin/login");
            }
        });
    }, []);
    return children;
};
