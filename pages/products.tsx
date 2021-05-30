import { NextPage } from 'next';
import Container from '@material-ui/core/Container';
import Layout from 'components/Layout';
import Products from 'components/Products';

const ProductsPage: NextPage = () => (
  <Layout title="Produtos | e-PDV">
    <Container maxWidth="xl">
      <Products isAdmin />
    </Container>
  </Layout>
);
export default ProductsPage;
