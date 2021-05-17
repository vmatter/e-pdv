import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { isTokenValid } from 'utils/token-validation';
import Layout from '../components/Layout';
import CartContainer from '../components/CartContainer';
import CartSummary from '../components/CartSummary';
import Products from '../components/Products';

const IndexPage: NextPage = () => {
  const router = useRouter();
  const validToken = isTokenValid();

  !validToken && router.push('/login');

  return validToken ? (
    <Layout title="Home | e-PDV">
      <CartContainer>
        <Products />
        <CartSummary />
      </CartContainer>
    </Layout>
  ) : null;
};

export default IndexPage;
