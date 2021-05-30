import { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchGetJSON } from '../../utils/api-helpers';
import ProductItem from '../ProductItem';
import AddProduct from '../AddProduct';
import { Alert } from '../Alert';
import { ProductList, ProductWrapper, Title, StyledSnackBar } from './styles';

const { API_URL } = process.env;

export type Product = {
  name: string;
  quantity: number;
  sku: string;
  id: string;
  price: number;
  images?: Array<string>;
  active: boolean;
};

const Products = ({ isAdmin = false }) => {
  const [openSucessAlert, setOpenSucessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [products, setProducts]: any = useState(null);
  const [renderedProducts, setRenderedProducts]: any = useState(null);
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

  useEffect(() => {
    products &&
      setRenderedProducts(
        isAdmin ? products : products.filter((product: any) => !!product.active)
      );
  }, [products]);

  const handleClose = () => {
    setOpenSucessAlert(false);
    setOpenErrorAlert(false);
  };

  const handleAlerts = (res: any) => {
    if (!res.message) {
      openSucessAlert && setOpenSucessAlert(false);
      setOpenSucessAlert(true);
    } else {
      openErrorAlert && setOpenErrorAlert(false);
      setOpenErrorAlert(true);
    }
  };

  return (
    <>
      {isAdmin && (
        <>
          <AddProduct handleAlerts={handleAlerts} updateList={fetchProducts} />
          <Title variant="h4" paddingBottom={1}>
            Produtos
          </Title>
        </>
      )}
      <ProductList>
        {loaded ? (
          renderedProducts ? (
            renderedProducts.map((product: Product) => (
              <ProductWrapper key={product.id}>
                <ProductItem
                  product={product}
                  isAdmin={isAdmin}
                  updateList={fetchProducts}
                  handleAlerts={handleAlerts}
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
      <StyledSnackBar
        open={openSucessAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Produto atualizado com sucesso!
        </Alert>
      </StyledSnackBar>
      <StyledSnackBar
        open={openErrorAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Houve um erro ao atualizar o produto :(
        </Alert>
      </StyledSnackBar>
    </>
  );
};

export default Products;
