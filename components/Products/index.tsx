import products from '../../data/products.json'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { ProductList, Product, ProductImg } from './styles'

const Products = () => {
  const { addItem, removeItem } = useShoppingCart()

  return (
    <ProductList>
      {products.map((product) => (
        <Product key={product.sku}>
          <ProductImg src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p className="price">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </p>
          <button
            className="cart-style-background"
            onClick={() => addItem(product)}
          >
            Add to cart
          </button>
          <button
            className="cart-style-background"
            onClick={() => removeItem(product.sku)}
          >
            Remove
          </button>
        </Product>
      ))}
    </ProductList>
  )
}

export default Products
