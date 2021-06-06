import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetchGetJSON } from '../utils/api-helpers';
import Layout from '../components/Layout';
import PrintObject from '../components/PrintObject';
import CartContainer from '../components/CartContainer';
import ClearCart from '../components/ClearCart';

const { API_URL } = process.env;

const ResultPage: NextPage = () => {
  const router = useRouter();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `${API_URL}checkout/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) return <div>failed to load</div>;

  return (
    <Layout title="Checkout Payment Result | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
        <h3>CheckoutSession response:</h3>
        <PrintObject content={data ?? 'loading...'} />
        <CartContainer>
          <ClearCart />
        </CartContainer>
      </div>
    </Layout>
  );
};

export default ResultPage;
