import { Image, PageHeader, Descriptions, Tag } from "antd";
import { GetServerSideProps } from "next";
import clientPromise from "../../lib/mongodb";
import { NextRouter, useRouter } from "next/router";
import { ReactElement } from "react";
import { Layout } from "../../components/Layout";
import { api } from "../../lib/api";
import Head from "next/head";
import { Product } from "../api/products";

const SeachTag = ({
    searchKey,
    value,
    router,
    color
}: {
    searchKey: string;
    value: string;
    color?: string;
    router: NextRouter;
}) => {
    return (
        <Tag
            color={color}
            className="cursor-pointer"
            onClick={() => router.push(`/list?${searchKey}=${value}`)}
        >
            {value}
        </Tag>
    );
};

export default function ProductDetailPage({ product }: { product: Product }) {
    const router = useRouter();
    return (
        <div className="max-w-4xl w-full">
            <Head>
                <title>{`${product.title}-东鑫商行`}</title>
                <meta
                    name="description"
                    content={`${product.title}，${product.category}，${product.brand}，${product.note}`}
                ></meta>
            </Head>
            <PageHeader
                onBack={() => {
                    if (window.history.length <= 2) {
                        router.push("/list");
                    } else {
                        router.back();
                    }
                }}
                title={product.title}
                subTitle={
                    <div>
                        <SeachTag
                            color="cyan"
                            searchKey="brand"
                            value={product.brand}
                            router={router}
                        />
                        <SeachTag
                            color="geekblue"
                            searchKey="category"
                            value={product.category}
                            router={router}
                        />
                    </div>
                }
            ></PageHeader>
            <Descriptions
                bordered
                className="shadow-sm"
                column={{ xs: 1, sm: 1, md: 2 }}
                labelStyle={{
                    fontWeight: 600,
                    width: "128px",
                    textAlign: "center"
                }}
            >
                <Descriptions.Item
                    label={"名称"}
                    className="bg-white border-slate-600"
                >
                    {product.title}
                </Descriptions.Item>
                <Descriptions.Item
                    label={"种类"}
                    className="bg-white border-slate-600"
                >
                    {product.category}
                </Descriptions.Item>
                <Descriptions.Item label={"品牌"} className="bg-white">
                    {product.brand}
                </Descriptions.Item>
                {product?.note ? (
                    <Descriptions.Item label={"备注"} className="bg-white">
                        {product.note}
                    </Descriptions.Item>
                ) : null}
            </Descriptions>
            <div className="mt-4">
                <Image
                    width={"100%"}
                    src={product.image}
                    className="object-cover shadow-sm max-h-screen"
                    alt={product.title}
                ></Image>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    await clientPromise;
    const { data: productsData } = await api.get(
        `/products/${context.params.id}`
    );
    const { data: product } = productsData;
    return {
        props: { product }
    };
};

ProductDetailPage.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>;
};
