import { NextPage } from 'next';
import Container from '@material-ui/core/Container';
import Layout from 'components/Layout';
import Accounts from '../components/Accounts';

const AccountsPage: NextPage = () => (
  <Layout title="Accounts | e-PDV">
    <Container maxWidth="xl">
      <Accounts />
    </Container>
  </Layout>
);
export default AccountsPage;
