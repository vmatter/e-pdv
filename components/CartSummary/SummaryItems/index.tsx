import { CartDetails, CartEntry } from 'use-shopping-cart';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { currencyFormatter } from '../../../utils/currency';
import { Product } from '../../Products';
import {
  ItemsList,
  ProductIcon,
  ItemWrapper,
  ItemDescription,
  ItemTotal,
} from './styles';

export type SummaryItemsProps = {
  cartDetails: CartDetails;
  incrementItem: (sku: string, count?: number | undefined) => void;
  decrementItem: (sku: string, count?: number | undefined) => void;
  products: Product[];
};

export const SummaryItems = ({
  cartDetails,
  incrementItem,
  decrementItem,
  products,
}: SummaryItemsProps) => {
  const foundProduct = (sku: string): Product | undefined =>
    products.find(product => product.sku === sku);

  const checkDisableAdd = (sku: string): boolean | undefined => {
    const found = foundProduct(sku);
    if (cartDetails[sku] && found) {
      return found?.quantity <= cartDetails[sku]?.quantity;
    }
    return false;
  };

  return (
    <>
      <Typography component="h2" variant="h6" align="center" padding={1}>
        Itens do Carrinho
      </Typography>
      <ItemsList>
        {Object.entries(cartDetails).map(product => {
          const sku = product[0];
          const content = product[1] as CartEntry;
          return (
            <ItemWrapper key={sku}>
              <ListItemAvatar>
                <Avatar>
                  <ProductIcon
                    src={content.images?.[0] || '/placeholder-image.png'}
                  />
                </Avatar>
              </ListItemAvatar>
              <ItemDescription
                primary={content.name}
                secondary={`${content.quantity} ${
                  content.quantity > 1 ? 'itens' : 'item'
                }`}
              />
              <ItemTotal secondary={currencyFormatter(content.value)} />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Remover item"
                  onClick={() => decrementItem(sku)}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  aria-label="Adicionar item"
                  disabled={checkDisableAdd(sku)}
                  onClick={() => incrementItem(sku)}
                >
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ItemWrapper>
          );
        })}
      </ItemsList>
    </>
  );
};
