import { Carousel } from "antd";
import { useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

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

export const HomeCarousel = () => {
    const carousel = useRef(null);
    const covers = [
        "https://cdn.ethanloo.cn/img/202204060003553.png",
        "https://cdn.ethanloo.cn/img/202204060003553.png",
        "https://cdn.ethanloo.cn/img/202204060003553.png"
    ];
    return (
        <Carousel
            autoplay
            effect="fade"
            ref={carousel}
            arrows={true}
            prevArrow={<LeftArrow onClick={() => carousel.current.prev()} />}
            nextArrow={<RightArrow onClick={() => carousel.current.next()} />}
        >
            {covers.map((p, idx) => (
                <div
                    className="flex relative justify-center items-center text-center bg-cover"
                    key={idx}
                >
                    <img src={p} className="object-cover block h-full w-full" />
                </div>
            ))}
        </Carousel>
    );
};
