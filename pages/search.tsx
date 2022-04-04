import { Layout, Pagination } from "antd";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ProductList } from "../components/ProductList";
import clientPromise from "../lib/mongodb";
import { Product } from "./api/products";

export default function List({ products }: { products: Product[] }) {
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
        <Layout className="min-h-screen">
            <Header />
            <Layout.Content className="flex flex-col px-4 sm:px-8 md:px-16 gap-4 py-4">
                <div className="flex justify-center items-center text-2xl font-semibold">
                    <h1>搜索关键词：{router.query.key}</h1>
                </div>
                <ProductList products={currentProducts} />
                <Pagination
                    className="flex justify-center items-center"
                    defaultCurrent={1}
                    current={page}
                    pageSize={pageSize}
                    total={products.length}
                    onChange={(page) => {
                        setPage(page);
                    }}
                />
            </Layout.Content>
            <Footer />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        await clientPromise;
        const fetchUrl = new URL(
            `${process.env.API_BASE}/products/search?key=${context.query?.key}`
        );
        const response = await fetch(fetchUrl.toString());
        const { data: products } = await response.json();
        return {
            props: { products }
        };
    } catch (error) {
        console.log(error);
    }
};
