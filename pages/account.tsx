import { NextPage } from 'next';
import Container from '@material-ui/core/Container';
import Layout from 'components/Layout';
import AccountForm from 'components/AccountForm';

const LoginPage: NextPage = () => (
  <Layout title="Conta | e-PDV" hasBgColor hasHeader={false}>
    <Container maxWidth="sm">
      <AccountForm />
    </Container>
  </Layout>
);
export default LoginPage;
