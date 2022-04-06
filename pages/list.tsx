import { Pagination } from "antd";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { ListMenu } from "../components/ListMenu";
import { ProductList } from "../components/ProductList";
import { api } from "../lib/api";
import clientPromise from "../lib/mongodb";
import { mergeQueryString } from "../lib/utils";

export default function List({ products, menu, count }) {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const pageSize = 12;
    useEffect(() => {
        const { page = 1 } = router.query;
        setPage(Number.parseInt(page as string));
    }, [router]);

    return (
        <div className="w-full">
            <div className="mb-4">
                <ListMenu menu={menu} />
            </div>

            <ProductList products={products} />
            <Pagination
                className="flex justify-center items-center"
                defaultCurrent={1}
                current={page}
                pageSize={pageSize}
                total={count}
                showTotal={(total) => `总共 ${total} 个商品`}
                onChange={(page) => {
                    router.push(
                        mergeQueryString(router.query, "page", page.toString())
                    );
                }}
            />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    await clientPromise;
    const { data: productsData } = await api.get("/products", {
        params: {
            ...context.query,
            page: context.query?.page || 1
        }
    });
    const { data: menuData } = await api.get("/products/menu");
    const { data: products = [], count = 0 } = productsData;
    const { data: menu = {} } = menuData;
    return {
        props: { products, menu, count }
    };
};

List.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
