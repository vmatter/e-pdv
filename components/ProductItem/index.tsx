import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Product } from '../Products';
import { CURRENCY } from '../../config';

type Props = {
  product: Product;
};

const ProductItem = ({ product }: Props) => {
  const { addItem, removeItem } = useShoppingCart();
  return (
    <Card>
      <CardMedia
        component="img"
        alt={product.name}
        image={product.images?.[0] || '/placeholder-image.png'}
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
            currency: CURRENCY,
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => removeItem(product.sku)}
        >
          Remove
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => addItem(product as any)}
        >
          Add Item
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
