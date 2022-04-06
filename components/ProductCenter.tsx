import { Product } from "../pages/api/products";
import { ProductList } from "./ProductList";

export const ProductCenter = ({ products }: { products: Product[] }) => {
    return <ProductList products={products}></ProductList>;
};
