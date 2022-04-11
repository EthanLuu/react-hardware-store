import { Input } from "antd";
import { useRouter } from "next/router";

export const SearchBar = ({ size }: { size?: any }) => {
    const router = useRouter();
    const handleSearch = (value: string) => {
        router.push(`/search?key=${value}`);
    };
    return (
        <Input.Search
            size={size || "middle"}
            onSearch={handleSearch}
            placeholder={"请输入要搜索的商品关键词"}
            onPressEnter={(e) => {
                handleSearch(e.currentTarget.value);
            }}
        ></Input.Search>
    );
};
