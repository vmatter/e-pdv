import { ReactNode } from 'react';
import { CartProvider } from 'use-shopping-cart';
import getStripe from '../../utils/get-stripejs';
import * as config from '../../config';
import { Wrapper } from './styles';

const CartContainer = ({ children }: { children: ReactNode }) => (
  <Wrapper>
    <CartProvider
      mode="checkout-session"
      stripe={getStripe()}
      currency={config.CURRENCY}
    >
      <>{children}</>
    </CartProvider>
  </Wrapper>
);

export default CartContainer;
