import { Layout, Menu, Spin } from "antd";
import {
    AppstoreOutlined,
    IdcardOutlined,
    HomeOutlined
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export const AdminSider = () => {
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [openKeys, setOpenKeys] = useState([]);
    const router = useRouter();
    const menuItems = [
        {
            key: "dashboard",
            name: "主页",
            pathname: "/admin",
            icon: <HomeOutlined />
        },
        {
            key: "product",
            name: "商品管理",
            icon: <AppstoreOutlined />,
            pathname: "/admin/product",
            children: [
                {
                    key: "allProduct",
                    name: "所有商品",
                    pathname: "/admin/product/all"
                },
                {
                    key: "addProduct",
                    name: "添加商品",
                    pathname: "/admin/product/add"
                }
            ]
        },
        {
            key: "shopinfo",
            name: "网站管理",
            icon: <IdcardOutlined />,
            pathname: "/admin/shopinfo",
            children: [
                // {
                //     key: "notice",
                //     name: "首页公告",
                //     pathname: "/admin/shopinfo/notice"
                // },
                {
                    key: "carousel",
                    name: "首页头图",
                    pathname: "/admin/shopinfo/carousel"
                },
                {
                    key: "about",
                    name: "关于本店",
                    pathname: "/admin/shopinfo/about"
                },
                {
                    key: "hotsearch",
                    name: "热门关键词",
                    pathname: "/admin/shopinfo/hotsearch"
                },
                {
                    key: "contact",
                    name: "联系方式",
                    pathname: "/admin/shopinfo/contact"
                }

            ]
        }
    ];

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        menuItems.map((item) => {
            if (item.pathname === router.pathname) {
                setSelectedKeys([item.key]);
            }
            for (let child of item.children || []) {
                if (child.pathname === router.pathname) {
                    setSelectedKeys([child.key]);
                    setOpenKeys([item.key]);
                }
            }
        });
        setLoading(false);
    }, [router]);

    if (loading) {
        return <Spin />;
    }

    return (
        <Layout.Sider className="min-h-screen" theme="dark">
            <div className="flex justify-center items-center p-2 pt-4">
                <h1 className="text-neutral-200 text-xl font-semibold">
                    东鑫电器商行后台
                </h1>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={selectedKeys}
                defaultOpenKeys={openKeys}
            >
                {menuItems.map((item) => {
                    return item.children ? (
                        <Menu.SubMenu
                            key={item.key}
                            title={item.name}
                            icon={item.icon}
                        >
                            {item.children?.map((child) => (
                                <Menu.Item key={child.key}>
                                    <Link href={child.pathname}>
                                        {child.name}
                                    </Link>
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    ) : (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link href={item.pathname}>{item.name}</Link>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </Layout.Sider>
    );
};
