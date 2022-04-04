import { Layout, Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";

export const Header = () => {
    const [selectedKey, setSelectedKey] = useState("");
    const router = useRouter();

    const menuItems = [
        {
            key: "home",
            name: "首页",
            pathname: "/"
        },
        {
            key: "list",
            name: "商品列表",
            pathname: "/list"
        },
        {
            key: "contact",
            name: "联系方式",
            pathname: "/contact"
        }
    ];

    useEffect(() => {
        menuItems.map((item) => {
            if (item.pathname === router.pathname) {
                setSelectedKey(item.key);
            }
        });
    }, [router]);
    return (
        <Layout.Header className="bg-white flex shadow-sm items-center w-full justify-between">
            <div className="flex">
                <div className="text-xl items-center font-bold mr-4 text-neutral-700 whitespace-nowrap hidden sm:flex">
                    <Link href="/">东鑫电器商行</Link>
                </div>
                <Menu
                    mode="horizontal"
                    theme="light"
                    className="border-none bg-none"
                    selectedKeys={[selectedKey]}
                >
                    {menuItems.map((item) => (
                        <Menu.Item key={item.key}>
                            <Link href={item.pathname}>{item.name}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>

            <div className="flex justify-end items-center col-end-1 flex-1 max-w-xs">
                <SearchBar />
            </div>
        </Layout.Header>
    );
};

export const AdminHeader = () => {
    const [selectedKey, setSelectedKey] = useState("");
    const router = useRouter();

    const menuItems = [
        {
            key: "product",
            name: "商品管理",
            pathname: "/admin"
        },
        {
            key: "shopinfo",
            name: "网站信息管理",
            pathname: "/admin/shopinfo"
        }
    ];

    useEffect(() => {
        menuItems.map((item) => {
            if (item.pathname === router.pathname) {
                setSelectedKey(item.key);
            }
        });
    }, []);
    return (
        <Layout.Header className="bg-white flex shadow-sm items-center w-full justify-between">
            <div className="flex">
                <div className="text-xl items-center font-bold mr-4 text-neutral-700 whitespace-nowrap hidden sm:flex">
                    <Link href="/">东鑫电器商行</Link>
                </div>
                <Menu
                    mode="horizontal"
                    theme="light"
                    className="border-none bg-none"
                    selectedKeys={[selectedKey]}
                >
                    {menuItems.map((item) => (
                        <Menu.Item key={item.key}>
                            <Link href={item.pathname}>{item.name}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        </Layout.Header>
    );
};
