import { Carousel } from "antd";
import { useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { CarouselItem } from "../pages/api/shopinfo/carousel";

const LeftArrow = ({ onClick }) => {
    return (
        <div
            className="absolute z-10 top-0 hover:bg-black hover:bg-opacity-50 left-0 h-full flex p-4 items-center cursor-pointer transition duration-500 ease-in-out"
            onClick={onClick}
        >
            <LeftOutlined
                style={{ color: "#fff", strokeWidth: "3" }}
                className="text-2xl"
            />
        </div>
    );
};

const RightArrow = ({ onClick }) => {
    return (
        <div
            className="absolute z-10 top-0 right-0 hover:bg-black hover:bg-opacity-50 h-full flex p-4 items-center cursor-pointer transition duration-500 ease-in-out"
            onClick={onClick}
        >
            <RightOutlined
                style={{ color: "#fff", strokeWidth: "3" }}
                className="text-2xl"
            />
        </div>
    );
};

export const HomeCarousel = ({ carousels }: { carousels: CarouselItem[] }) => {
    const carousel = useRef(null);
    return (
        <Carousel
            autoplay
            effect="fade"
            ref={carousel}
            arrows={true}
            prevArrow={<LeftArrow onClick={() => carousel.current.prev()} />}
            nextArrow={<RightArrow onClick={() => carousel.current.next()} />}
        >
            {carousels.map((c) => (
                <div key={c._id}>
                    <img src={c.image} className="object-cover block m-auto" />
                </div>
            ))}
        </Carousel>
    );
};
