import products from '../../data/products.json';
import { ProductList, ProductWrapper } from './styles';
import ProductItem from '../ProductItem';

const Products = () => {
  return (
    <ProductList>
      {products.map(product => (
        <ProductWrapper key={product.sku}>
          <ProductItem product={product} />
        </ProductWrapper>
      ))}
    </ProductList>
  );
};

export default Products;
