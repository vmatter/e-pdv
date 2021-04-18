import { NextPage } from 'next';
import Layout from '../components/Layout';

import CartContainer from '../components/CartContainer';
import CartSummary from '../components/CartSummary';
import Products from '../components/Products';

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | e-PDV">
      <CartContainer>
        <Products />
        <CartSummary />
      </CartContainer>
    </Layout>
  );
};

export default IndexPage;
