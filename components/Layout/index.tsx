import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Header, Content, LogoWrapper, LogoImg } from './styles';

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
        <Header>
          <Content>
            <Link href="/">
              <LogoWrapper>
                <LogoImg src="/pdv-logo.png" />
              </LogoWrapper>
            </Link>
          </Content>
        </Header>
      )}
      {children}
    </Container>
  </>
);

export default Layout;
