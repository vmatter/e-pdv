import { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ProductList, ProductWrapper } from './styles';
import ProductItem from '../ProductItem';
import { fetchGetJSON } from '../../utils/api-helpers';

const { API_URL } = process.env;

export type Product = {
  name: string;
  quantity: number;
  sku: string;
  id: string;
  price: number;
  images?: Array<string>;
};

const Products = ({ isAdmin = false }) => {
  const [products, setProducts]: any = useState(null);
  const [loaded, setLoaded] = useState(false);
  const fetchProducts = async () => {
    const response = await fetchGetJSON(`${API_URL}products`);

    if (!response.message) {
      setProducts(response.docs);
    }
    setLoaded(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductList>
      {loaded ? (
        products ? (
          products.map((product: Product) => (
            <ProductWrapper key={product.id}>
              <ProductItem
                product={product}
                isAdmin={isAdmin}
                updateList={fetchProducts}
              />
            </ProductWrapper>
          ))
        ) : (
          <div>Sem produtos</div>
        )
      ) : (
        <CircularProgress />
      )}
    </ProductList>
  );
};

export default Products;
