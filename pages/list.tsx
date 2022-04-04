import { Pagination } from "antd";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { ListMenu } from "../components/ListMenu";
import { ProductList } from "../components/ProductList";
import clientPromise from "../lib/mongodb";
import { getFetchUrl, mergeQueryString } from "../lib/utils";

export default function List({ products, menu, count }) {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const pageSize = 12;
    useEffect(() => {
        const { page = 1 } = router.query;
        setPage(Number.parseInt(page as string));
    }, [router.query]);

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
    try {
        await clientPromise;
        const fetchUrl = getFetchUrl(
            `${process.env.API_BASE}/products`,
            Object.assign({ page: 1 }, context.query)
        );
        const productResponse = await fetch(fetchUrl.toString());
        const menuResponse = await fetch(
            `${process.env.API_BASE}/products/menu`
        );
        const { data: products, count } = await productResponse.json();
        const menu = await menuResponse.json();
        return {
            props: { products, menu, count }
        };
    } catch (error) {
        console.log(error);
    }
};

List.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
