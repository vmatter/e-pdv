import { NextPage } from 'next';
import Container from '@material-ui/core/Container';
import Layout from 'components/Layout';
import LoginForm from '../components/LoginForm';

const LoginPage: NextPage = () => (
  <Layout title="Log in | e-PDV" hasBgColor hasHeader={false}>
    <Container maxWidth="sm">
      <LoginForm />
    </Container>
  </Layout>
);
export default LoginPage;
