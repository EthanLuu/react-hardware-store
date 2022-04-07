import { Pagination } from "antd";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { ProductList } from "../components/ProductList";
import { api } from "../lib/api";
import clientPromise from "../lib/mongodb";
import { Product } from "./api/products";

export default function Search({ products }: { products: Product[] }) {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [currentProducts, setCurrentProducts] = useState([]);
    const pageSize = 12;
    useEffect(() => {
        setCurrentProducts(
            products.slice((page - 1) * pageSize, page * pageSize)
        );
    }, [page]);

    return (
        <div className="w-full">
            <Head>
                <title>搜索-东鑫商行</title>
            </Head>
            <div className="flex justify-center items-center text-2xl font-semibold mb-4">
                <h1>搜索关键词：{router.query.key}</h1>
            </div>
            <ProductList products={currentProducts} />
            <Pagination
                className="flex justify-center items-center"
                defaultCurrent={1}
                current={page}
                pageSize={pageSize}
                total={products.length}
                showTotal={(total) => `总共 ${total} 个商品`}
                onChange={(page) => {
                    setPage(page);
                }}
            />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    await clientPromise;
    const { data: productsData } = await api.get("/products/search", {
        params: {
            key: context.query.key
        }
    });
    return {
        props: { products: productsData.data || [] }
    };
};

Search.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
