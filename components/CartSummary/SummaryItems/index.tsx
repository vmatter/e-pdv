import { CartDetails, CartEntry } from 'use-shopping-cart';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {
  ItemsList,
  ProductIcon,
  ItemWrapper,
  ItemDescription,
  ItemTotal,
} from './styles';

type Props = {
  cartDetails: CartDetails;
  incrementItem: (sku: string, count?: number | undefined) => void;
  decrementItem: (sku: string, count?: number | undefined) => void;
};
export const SummaryItems = ({
  cartDetails,
  incrementItem,
  decrementItem,
}: Props) => {
  console.log(`cartDetails`, cartDetails);
  return (
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
            <ItemTotal secondary={content.formattedValue} />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Remover item"
                onClick={() => decrementItem(sku)}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton
                aria-label="Adicionar item"
                onClick={() => incrementItem(sku)}
              >
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ItemWrapper>
        );
      })}
    </ItemsList>
  );
};
