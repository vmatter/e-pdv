import { NextPage } from 'next';
import Container from '@material-ui/core/Container';
import Layout from 'components/Layout';
import Accounts from '../components/Accounts';
import TableAccounts from '../components/TableAccounts';

const AccountsPage: NextPage = () => (
  <Layout title="Usuários | e-PDV">
    <Container maxWidth="xl">
      <Accounts />
      <TableAccounts />
    </Container>
  </Layout>
);
export default AccountsPage;
