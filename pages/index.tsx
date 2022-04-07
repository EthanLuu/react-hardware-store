import { HomeCarousel } from "../components/HomeCarousel";
import { NoticeBoard } from "../components/NoticeBoard";
import { RecommendTags } from "../components/RecommendTags";
import clientPromise from "../lib/mongodb";
import { api } from "../lib/api";
import { ReactElement } from "react";
import { Layout } from "../components/Layout";
import { ProductCenter } from "../components/ProductCenter";
import { Button } from "antd";
import Link from "next/link";
import { About } from "../components/About";

export default function Home({ products, notice, hotsearches }) {
    return (
        <div className="w-full">
            <div className="flex flex-col bg-white relative">
                <HomeCarousel />
            </div>
            <div className="flex justify-center items-center py-8 flex-col px-6 lg:px-12 xl:px-24 bg-slate-200">
                <h2 className="text-3xl font-bold text-gray-600">产品中心</h2>
                <div className="w-24 h-1 bg-blue-400 m-4"></div>
                <div className="py-4 w-full">
                    <ProductCenter products={products} />
                </div>

                <Button type="primary" size="large">
                    <Link href="/list">查看更多</Link>
                </Button>
            </div>

            <div className="flex justify-center items-center py-8 flex-col bg-slate-50 px-6 lg:px-12 xl:px-24">
                <h2 className="text-3xl font-bold text-gray-600">关于本店</h2>
                <div className="w-24 h-1 bg-blue-400 m-4"></div>
                <div className="pt-4 w-full">
                    <About />
                </div>
            </div>
            <div className="flex justify-center items-center py-8 flex-col bg-slate-200">
                <h2 className="text-3xl font-bold text-gray-600">热门搜索</h2>
                <div className="w-24 h-1 bg-blue-400 m-4"></div>
                <div className="pt-4 w-full">
                    <RecommendTags tags={hotsearches} />
                </div>
            </div>
            {/* <NoticeBoard notice={notice} /> */}
        </div>
    );
}

export async function getServerSideProps() {
    await clientPromise;
    const { data: productsData } = await api.get("/products", {
        params: {
            inCarousel: true
        }
    });
    const { data: noticeData } = await api.get("/shopinfo/notice");
    const { data: hotsearchesData } = await api.get("/shopinfo/hotsearch");
    return {
        props: {
            products: productsData.data || [],
            notice: noticeData.data || {},
            hotsearches: hotsearchesData.data || []
        }
    };
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout className="px-0">{page}</Layout>;
};
