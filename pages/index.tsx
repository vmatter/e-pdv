import { NextPage } from 'next'
import Layout from '../components/Layout'

import Cart from '../components/Cart'
import CartSummary from '../components/CartSummary'
import Products from '../components/Products'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | e-PDV">
      <Cart>
        <Products />
        <CartSummary />
      </Cart>
    </Layout>
  )
}

export default IndexPage
