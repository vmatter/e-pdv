import { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useShoppingCart } from 'use-shopping-cart';
import { fetchPostJSON } from '../../utils/api-helpers';
import { DesktopSection, MobileSection } from '../Layout/styles';
import { SummaryItems } from './SummaryItems';
import { Summary } from './Summary';
import { Container, Form, FormContent } from './styles';

const CartSummary = () => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);

  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    incrementItem,
    decrementItem,
  } = useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    setLoading(true);

    const response = await fetchPostJSON(
      '/api/checkout_sessions/cart',
      cartDetails
    );

    if (response.statusCode === 500) {
      console.error(response.message);
      setLoading(false);
      return;
    }

    redirectToCheckout({ sessionId: response.id });

    setLoading(false);
  };

  return (
    <>
      <DesktopSection>
        <Paper elevation={3}>
          <Container>
            <Form onSubmit={handleCheckout}>
              <FormContent>
                <Typography
                  component="h2"
                  variant="h6"
                  align="center"
                  padding={1}
                >
                  Resumo do Carrinho
                </Typography>
                <SummaryItems
                  cartDetails={cartDetails}
                  incrementItem={incrementItem}
                  decrementItem={decrementItem}
                />
              </FormContent>
              <Summary
                cartCount={cartCount}
                formattedTotalPrice={formattedTotalPrice}
                cartEmpty={cartEmpty}
                loading={loading}
                clearCart={clearCart}
              />
            </Form>
          </Container>
        </Paper>
      </DesktopSection>
      <MobileSection>
        <Summary
          cartCount={cartCount}
          formattedTotalPrice={formattedTotalPrice}
          cartEmpty={cartEmpty}
          loading={loading}
          clearCart={clearCart}
        />
      </MobileSection>
    </>
  );
};

export default CartSummary;
