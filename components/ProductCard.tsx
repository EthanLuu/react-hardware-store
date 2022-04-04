import { Card } from "antd";
import Link from "next/link";
import { Product } from "../pages/api/products";

export const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Link href={`/product/${product._id}`}>
            <Card
                className="overflow-hidden p-2 shadow-sm"
                hoverable
                bodyStyle={{
                    padding: "8px",
                    paddingTop: "12px"
                }}
                cover={
                    <img
                        alt={product.title}
                        src={product.image}
                        className="block object-cover h-32 w-full rounded-sm overflow-hidden"
                    />
                }
            >
                <Card.Meta
                    title={product.title}
                    description={`${product.category} | ${product.brand}`}
                ></Card.Meta>
            </Card>
        </Link>
    );
};
