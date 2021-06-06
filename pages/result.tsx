import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import { fetchGetJSON } from '../utils/api-helpers';
import Layout from '../components/Layout';
// import PrintObject from '../components/PrintObject';
import CartContainer from '../components/CartContainer';
import ClearCart from '../components/ClearCart';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';

const { API_URL } = process.env;

const ResultPage: NextPage = () => {
  const { query } = useRouter();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    query.session_id ? `${API_URL}checkout/${query.session_id}` : null,
    fetchGetJSON
  );

  if (error) return <div>Houve algum erro</div>;

  return (
    <Layout title="Checkout Payment Result | Next.js + TypeScript Example">
      <Container maxWidth="md">
        <Box mt={4} textAlign="center">
          {!data?.payment_intent?.status ? (
            'carregando...'
          ) : data?.payment_intent?.status === 'succeeded' ? (
            <Typography variant="h2">Compra realizada com sucesso!</Typography>
          ) : (
            <Typography variant="h2">
              Houve um erro ao realizar a compra.
            </Typography>
          )}

          {/* <h3>CheckoutSession response:</h3>
        <PrintObject content={data ?? 'loading...'} /> */}
          <Link href="/">
            <Button startIcon={<ArrowBack />}>Voltar</Button>
          </Link>
        </Box>

        <CartContainer>
          <ClearCart />
        </CartContainer>
      </Container>
    </Layout>
  );
};

export default ResultPage;
