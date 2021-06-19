import { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { fetchGetJSON } from '../../utils/api-helpers';
import ProductItem from '../ProductItem';
import AddProduct from '../AddProduct';
import InfiniteScroll from '../InfiniteScroll';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [products, setProducts] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchProducts = async (fetchPage = 1) => {
    const activeInfo = !isAdmin ? `&active=true` : '';
    const response = await fetchGetJSON(
      `${API_URL}products?page=${fetchPage}${activeInfo}`
    );

    if (!response.message) {
      const oldList = currentPage === 1 ? [] : products;
      const newList =
        response.docs.length > 0 ? [...oldList, ...response.docs] : oldList;

      const { page, totalDocs } = response;

      setProducts(newList as any);
      setCurrentPage(page);
      setTotalDocs(totalDocs);
    }
    setLoaded(true);
  };

  const fetchMoreData = () => {
    if (products.length >= totalDocs) {
      setHasMoreData(false);
      return;
    }
    fetchProducts(currentPage + 1);
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
            <InfiniteScroll
              fetchMore={fetchMoreData}
              hasMoreData={hasMoreData}
              currentPage={currentPage}
            >
              {products.map((product: Product) => (
                <ProductWrapper key={product.id}>
                  <ProductItem
                    product={product}
                    isAdmin={isAdmin}
                    updateList={fetchProducts}
                    handleAlerts={handleAlerts}
                  />
                </ProductWrapper>
              ))}
            </InfiniteScroll>
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
