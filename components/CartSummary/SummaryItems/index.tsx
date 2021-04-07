import React from 'react';
import { CartDetails } from 'use-shopping-cart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import { ProductIcon } from './styles';

type Props = {
  cartDetails: CartDetails;
};

export const SummaryItems = ({ cartDetails }: Props) => {
  return (
    <List>
      {Object.entries(cartDetails).map(product => {
        const sku = product[0];
        const content = product[1];
        return (
          <ListItem key={sku}>
            <ListItemAvatar>
              <Avatar>
                <ProductIcon src={content.image} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={content.name} secondary={content.quantity} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};
