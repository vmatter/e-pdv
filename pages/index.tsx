import { NextPage } from 'next'
// import Link from 'next/link'
import Layout from '../components/Layout'

import Cart from '../components/Cart'
import CartSummary from '../components/CartSummary'
import Products from '../components/Products'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | e-PDV">
      {/* <ul className="card-list">
        <li>
          <Link href="/use-shopping-cart">
            <a className="card cart-style-background">
              <h2 className="bottom">Use Shopping Cart</h2>
              <img src="/use-shopping-cart.png" />
            </a>
          </Link>
        </li>
      </ul> */}
      <Cart>
        <Products />
        <CartSummary />
      </Cart>
    </Layout>
  )
}

export default IndexPage
