import { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
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
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const activeParam = !isAdmin ? '&active=true' : '';
    const response = await fetchGetJSON(
      `${API_URL}products?toPaginate=false${activeParam}`
    );

    if (!response.message) {
      setProducts(response.docs);
    }
    setLoaded(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
          products.length > 0 ? (
            products.map((product: Product) => (
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
            <Box sx={{ textAlign: 'center', pt: 1 }}>
              <div>Sem produtos disponíveis</div>
            </Box>
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
