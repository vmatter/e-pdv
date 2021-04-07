import products from '../../data/products.json';
import { ProductList, ProductWrapper } from './styles';
import ProductItem from '../ProductItem';

export type Product = {
  name: string;
  description?: string;
  sku: string;
  price: number;
  image: string;
  currency: string;
};

const Products = () => {
  return (
    <ProductList>
      {products.map((product: Product) => (
        <ProductWrapper key={product.sku}>
          <ProductItem product={product} />
        </ProductWrapper>
      ))}
    </ProductList>
  );
};

export default Products;
