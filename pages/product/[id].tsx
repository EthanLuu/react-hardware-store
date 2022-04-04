import { Image, PageHeader, Descriptions, Tag } from "antd";
import { GetServerSideProps } from "next";
import clientPromise from "../../lib/mongodb";
import { NextRouter, useRouter } from "next/router";
import { ReactElement } from "react";
import { Layout } from "../../components/Layout";

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

export default function ProductDetailPage({ product }) {
    const router = useRouter();
    return (
        <div className="max-w-3xl w-full">
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
                column={{ xs: 1, sm: 1, md: 2 }}
                labelStyle={{
                    fontWeight: 600,
                    width: "128px",
                    textAlign: "center"
                }}
            >
                <Descriptions.Item label={"名称"} className="bg-white">
                    {product.title}
                </Descriptions.Item>
                <Descriptions.Item label={"种类"} className="bg-white">
                    {product.category}
                </Descriptions.Item>
                <Descriptions.Item label={"品牌"} className="bg-white">
                    {product.brand}
                </Descriptions.Item>
                <Descriptions.Item label={"参考价格"} className="bg-white">
                    {`${product.price.toFixed(2)}元`}
                </Descriptions.Item>
                {product?.note ? (
                    <Descriptions.Item label={"备注"} className="bg-white">
                        {product.note}
                    </Descriptions.Item>
                ) : null}
            </Descriptions>
            <div className="mt-6">
                <Image
                    height={"400px"}
                    width={"100%"}
                    src={product.image}
                    className="object-cover shadow-sm"
                    alt={product.title}
                ></Image>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        await clientPromise;
        const response = await fetch(
            `${process.env.API_BASE}/products/${context.params.id}`
        );
        const product = (await response.json()).data;
        return {
            props: { product }
        };
    } catch (error) {
        console.log(error);
        return {
            props: { product: {} }
        };
    }
};

ProductDetailPage.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>;
};