import { ReactNode } from 'react';
import Head from 'next/head';
import { Container, Header } from './styles';
import HeaderBar from '../HeaderBar';

export type ContainerProps = {
  hasBgColor?: boolean;
};

type Props = {
  children: ReactNode;
  title?: string;
  hasHeader?: boolean;
} & ContainerProps;

const Layout = ({
  children,
  title = 'e-PDV',
  hasHeader = true,
  hasBgColor = false,
}: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Container hasBgColor={hasBgColor}>
      {hasHeader && (
        <>
          <Header>
            <HeaderBar />
          </Header>
        </>
      )}
      {children}
    </Container>
  </>
);

export default Layout;
