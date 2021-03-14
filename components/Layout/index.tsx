import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Container, Header, Content, LogoWrapper, LogoImg } from './styles'

type Props = {
  children: ReactNode
  title?: string
}

const Layout = ({
  children,
  title = 'e-PDV',
}: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Container>
      <Header>
        <Content>
          <Link href="/">
            <LogoWrapper>
              <LogoImg src="/pdv-logo.png" />
            </LogoWrapper>
          </Link>
        </Content>
      </Header>
      {children}
    </Container>
  </>
)

export default Layout
