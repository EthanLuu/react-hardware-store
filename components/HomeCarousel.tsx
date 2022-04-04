import { Carousel } from "antd";
import Link from "next/link";
import { useRef } from "react";
import { Product } from "../pages/api/products";
import { ChevronLeft, ChevronRight } from "./Icons";

const LeftArrow = ({ onClick }) => {
    return (
        <div
            className="absolute z-10 left-2 top-44 flex p-1 cursor-pointer stroke-white bg-black bg-opacity-50 rounded-full"
            onClick={onClick}
        >
            <ChevronLeft />
        </div>
    );
};

const RightArrow = ({ onClick }) => {
    return (
        <div
            className="absolute z-10 right-2 top-44 flex p-1 cursor-pointer stroke-white bg-black bg-opacity-50 rounded-full"
            onClick={onClick}
        >
            <ChevronRight />
        </div>
    );
};

export const HomeCarousel = ({
    products,
    title
}: {
    products: Product[];
    title: string;
}) => {
    const carousel = useRef(null);
    return (
        <Carousel
            autoplay
            effect="fade"
            ref={carousel}
            arrows={true}
            prevArrow={<LeftArrow onClick={() => carousel.current.prev()} />}
            nextArrow={<RightArrow onClick={() => carousel.current.next()} />}
            className="overflow-hidden shadow-lg"
        >
            {products.map((p) => (
                <div
                    className="cursor-pointer flex relative h-96 justify-center items-center text-center bg-cover"
                    key={p._id.toString()}
                >
                    <Link href={`/product/${p._id.toString()}`}>
                        <img
                            src={p.image}
                            alt={p.title}
                            className="object-cover block h-full w-full"
                        />
                    </Link>
                    <div
                        style={{ textShadow: "1px 1px #444" }}
                        className="text-2xl badge absolute top-3 right-3 bg-slate-900 bg-opacity-50 p-2 rounded-lg text-white font-semibold"
                    >
                        {`${p.category} | ${p.title}`}
                    </div>
                    <div className="absolute top-3 flex left-3">
                        <div className="text-3xl badge bg-white bg-opacity-50 p-2 rounded-lg text-black font-semibold">
                            {title}
                        </div>
                    </div>

                    <div className="mask w-full absolute bottom-0 left-0 h-7 bg-black bg-opacity-20"></div>
                </div>
            ))}
        </Carousel>
    );
};
