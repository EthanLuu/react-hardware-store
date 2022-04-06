import { Divider, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { mergeQueryString } from "../lib/utils";

const MenuItem: React.FC<{
    searchKey: string;
    value: string;
    selected: boolean;
}> = ({ searchKey, value, selected }) => {
    return (
        <div className={selected ? "text-blue-500" : null}>
            <Link href={mergeQueryString({}, searchKey, value)}>
                {value || "全部"}
            </Link>
        </div>
    );
};

export const ListMenu = ({
    menu
}: {
    menu: { categories?: string[]; brands?: string[] };
}) => {
    const router = useRouter();
    const [selectedMenu, setSelectedMenu] = useState(null);
    useEffect(() => {
        const queries = Object.values(router.query);
        if (queries.length > 0) {
            setSelectedMenu(queries[0]);
        } else {
            setSelectedMenu(null);
        }
    }, [router.query]);
    return (
        <div className="p-2 px-4 bg-white rounded-md shadow-sm">
            <Row className="py-1">
                <span className="font-semibold">按种类筛选：</span>
                <div className="flex gap-3">
                    <MenuItem
                        value={null}
                        searchKey={"category"}
                        selected={selectedMenu === null}
                    />
                    {menu.categories?.map((c: string) => (
                        <MenuItem
                            key={c}
                            value={c}
                            searchKey={"category"}
                            selected={selectedMenu === c}
                        />
                    ))}
                </div>
            </Row>
            <Divider className="my-1" />
            <Row className="py-1">
                <span className="font-semibold">按品牌筛选：</span>
                <div className="flex gap-3">
                    <MenuItem
                        value={null}
                        searchKey={"brand"}
                        selected={selectedMenu === null}
                    />
                    {menu.brands?.map((b: string) => (
                        <MenuItem
                            key={b}
                            value={b}
                            searchKey={"brand"}
                            selected={selectedMenu === b}
                        />
                    ))}
                </div>
            </Row>
        </div>
    );
};
