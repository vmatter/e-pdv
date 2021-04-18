import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { useShoppingCart } from 'use-shopping-cart';
import { fetchPostJSON } from '../../utils/api-helpers';
import { SummaryItems } from './SummaryItems';
import {
  Container,
  Form,
  FormContent,
  FormActions,
  SummaryWrapper,
  InfoWrapper,
  InfoItem,
} from './styles';
import { DesktopSection } from '../Layout/styles';

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
      return;
    }

    redirectToCheckout({ sessionId: response.id });
  };

  return (
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
            <SummaryWrapper>
              <InfoWrapper>
                <InfoItem>
                  <strong>Total de Itens:</strong> {cartCount}
                </InfoItem>
                <InfoItem>
                  <strong>Valor Total:</strong> {formattedTotalPrice}
                </InfoItem>
              </InfoWrapper>
              <FormActions>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={cartEmpty || loading}
                >
                  Finalizar Compra
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={clearCart}
                >
                  Limpar Carrinho
                </Button>
              </FormActions>
            </SummaryWrapper>
          </Form>
        </Container>
      </Paper>
    </DesktopSection>
  );
};

export default CartSummary;
