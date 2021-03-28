import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import { useShoppingCart } from 'use-shopping-cart';
import { fetchPostJSON } from '../../utils/api-helpers';
import {
  Container,
  Form,
  FormContent,
  FormActions,
  SummaryWrapper,
} from './styles';

const CartSummary = () => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
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

  console.log(`cartDetails`, cartDetails);

  return (
    <Container>
      <Form onSubmit={handleCheckout}>
        <FormContent>
          <h2>Resumo do Carrinho</h2>
        </FormContent>
        <SummaryWrapper>
          <p suppressHydrationWarning>
            <strong>Total de Itens:</strong> {cartCount}
          </p>
          <p suppressHydrationWarning>
            <strong>Valor Total:</strong> {formattedTotalPrice}
          </p>
          <FormActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={cartEmpty || loading}
            >
              Finalizar Compra
            </Button>
            <Button variant="contained" color="secondary" onClick={clearCart}>
              Limpar Carrinho
            </Button>
          </FormActions>
        </SummaryWrapper>
      </Form>
    </Container>
  );
};

export default CartSummary;
