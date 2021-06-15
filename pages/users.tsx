import { NextPage } from 'next';
import Container from '@material-ui/core/Container';
import Layout from 'components/Layout';
import Users from '../components/Users';

const UsersPage: NextPage = () => (
  <Layout title="Usuários | e-PDV">
    <Container maxWidth="xl">
      <Users />
    </Container>
  </Layout>
);
export default UsersPage;
