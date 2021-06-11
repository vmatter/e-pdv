import { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useShoppingCart } from 'use-shopping-cart';
import { fetchPostJSON } from '../../utils/api-helpers';
import { SummaryItems } from './SummaryItems';
import { Summary } from './Summary';
import { Container, Form, FormContent } from './styles';
import SwipableSummary from './SwipableSummary';
import { currencyFormatter } from 'utils/currency';

const { API_URL } = process.env;

const CartSummary = () => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    incrementItem,
    decrementItem,
    totalPrice,
  } = useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    setLoading(true);

    const response = await fetchPostJSON(`${API_URL}checkout`, {
      cart_items: Object.values(cartDetails).map(product => ({
        id: product.id,
        quantity: product.quantity,
      })),
      success_url: `${window.location.href}result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${window.location.href}`,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      setLoading(false);
      return;
    }

    redirectToCheckout({ sessionId: response.id });

    setLoading(false);
  };

  return isMobile ? (
    <SwipableSummary
      cartDetails={cartDetails}
      incrementItem={incrementItem}
      decrementItem={decrementItem}
      cartCount={cartCount}
      formattedTotalPrice={currencyFormatter(totalPrice)}
      cartEmpty={cartEmpty}
      loading={loading}
      clearCart={clearCart}
      handleCheckout={handleCheckout}
    />
  ) : (
    <Paper elevation={3}>
      <Container>
        <Form onSubmit={handleCheckout}>
          <FormContent>
            <SummaryItems
              cartDetails={cartDetails}
              incrementItem={incrementItem}
              decrementItem={decrementItem}
            />
          </FormContent>
          <Summary
            cartCount={cartCount}
            formattedTotalPrice={currencyFormatter(totalPrice)}
            cartEmpty={cartEmpty}
            loading={loading}
            clearCart={clearCart}
          />
        </Form>
      </Container>
    </Paper>
  );
};

export default CartSummary;
