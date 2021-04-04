import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Product } from '../Products';

type Props = {
  product: Product;
};

const ProductItem = ({ product }: Props) => {
  const { addItem, removeItem } = useShoppingCart();
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={product.name}
          image={product.image}
          height="140"
          width="140"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography component="p">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => removeItem(product.sku)}
        >
          Remove
        </Button>
        <Button size="small" color="primary" onClick={() => addItem(product)}>
          Add Item
        </Button>
      </CardActions>
    </Card>
  );
};

// <Product key={product.sku}>
//   <ProductImg src={product.image} alt={product.name} />
//   <h2>{product.name}</h2>
//   <p className="price">
//     {formatCurrencyString({
//       value: product.price,
//       currency: product.currency,
//     })}
//   </p>
//   <button
//     className="cart-style-background"
//     onClick={() => addItem(product)}
//   >
//     Add to cart
//   </button>
//   <button
//     className="cart-style-background"
//     onClick={() => removeItem(product.sku)}
//   >
//     Remove
//   </button>
// </Product>
export default ProductItem;
