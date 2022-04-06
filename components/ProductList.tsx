import { List } from "antd";
import { Product } from "../pages/api/products";
import { ProductCard } from "./ProductCard";

export const ProductList = ({ products }: { products: Product[] }) => {
    return (
        <List
            grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 4, column: 4 }}
            dataSource={products}
            renderItem={(p) => (
                <List.Item key={p._id.toString()}>
                    <ProductCard product={p} />
                </List.Item>
            )}
        ></List>
    );
};
