import { Layout } from "antd";
import { ContactHelper } from "../components/ContactHepler";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HomeCarousel } from "../components/HomeCarousel";
import { NoticeBoard } from "../components/NoticeBoard";
import { RecommendTags } from "../components/RecommendTags";
import clientPromise from "../lib/mongodb";
import { Product } from "./api/products";

export default function Home({ products, notice, hotsearches }) {
    return (
        <Layout className="min-h-screen">
            <Header />
            <Layout.Content className="flex flex-col">
                <NoticeBoard notice={notice} />
                <div className="flex flex-col pt-8 pb-8">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        热门关键词
                    </h2>
                    <RecommendTags tags={hotsearches} />
                </div>
                <div className="flex flex-col bg-white relative">
                    <div className="shadow-md">
                        <HomeCarousel products={products} title={"今日推荐"} />
                    </div>
                </div>
            </Layout.Content>
            <ContactHelper />
            <Footer />
        </Layout>
    );
}

export async function getServerSideProps() {
    try {
        await clientPromise;
        const productsResponse = await fetch(
            `${process.env.API_BASE}/products?inCarousel=true`
        );
        const noticeResponse = await fetch(
            `${process.env.API_BASE}/shopinfo/notice`
        );
        const hotsearchResponse = await fetch(
            `${process.env.API_BASE}/shopinfo/hotsearch`
        );
        const products =
            ((await productsResponse.json()).data as Product[]) || [];
        const notice = (await noticeResponse.json()).data || {};
        const hotsearches = (await hotsearchResponse.json()).data || [];
        return {
            props: {
                products,
                notice,
                hotsearches
            }
        };
    } catch (error) {
        console.log(error);
    }
}
