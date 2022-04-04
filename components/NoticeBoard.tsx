import { Row, Typography } from "antd";

export const NoticeBoard = ({ notice }) => {
    const { Text } = Typography;
    const { title, rows } = notice;
    return (
        <div className="flex flex-col justify-center items-center bg-notice bg-cover relative py-6 overflow-hidden shadow-lg">
            <div
                className="relative z-10 flex items-center flex-col"
                style={{ textShadow: "1px 1px #000" }}
            >
                <Row>
                    <Text className="text-white text-4xl font-semibold py-2">
                        {title}
                    </Text>
                </Row>
                {rows.map((row: string, idx: number) => {
                    return (
                        <Row key={idx} className="py-1">
                            <Text className="text-white text-md sm:text-lg lg:text-xl">
                                {row}
                            </Text>
                        </Row>
                    );
                })}
            </div>
            <div className="mask absolute w-full h-full bg-black bg-opacity-60"></div>
        </div>
    );
};
