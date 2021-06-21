import { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useShoppingCart } from 'use-shopping-cart';
import { fetchPostJSON, fetchGetJSON } from '../../utils/api-helpers';
import { currencyFormatter } from '../../utils/currency';
import { SummaryItems } from './SummaryItems';
import { Summary } from './Summary';
import SwipableSummary from './SwipableSummary';
import { Container, Form, FormContent } from './styles';

const { API_URL } = process.env;

const CartSummary = () => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessages, setDialogMessages] = useState(['']);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    incrementItem,
    decrementItem,
    removeItem,
    addItem,
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

  const handleClose = () => {
    setShowDialog(false);
  };

  let allProducts = '';
  Object.values(cartDetails).map(product => {
    allProducts += product.id + ',';
  });

  allProducts = allProducts.substr(0, allProducts.length - 1);

  const fetchCartProducts = async () => {
    const response = await fetchGetJSON(
      `${API_URL}products?id=` + allProducts + `&toPaginate=false`
    );
    if (!response.message) {
      let _showDialog = false;
      const _messages = [''] as string[];

      Object.values(cartDetails).map(product => {
        for (let i = 0; i < response.docs.length; i++) {
          if (product.id === response.docs[i].id) {
            if (product.price !== response.docs[i].price) {
              removeItem(product.sku);
              addItem(response.docs[i], product.quantity);
              _messages.push(
                ` O produto "${
                  product.name
                }" teve seu preço alterado para R$ ${response.docs[i].price
                  .toFixed(2)
                  .replace('.', ',')}.`
              );

              _showDialog = true;
            }

            if (product.name !== response.docs[i].name) {
              removeItem(product.sku);
              addItem(response.docs[i], product.quantity);
              _messages.push(
                ` O produto "${product.name}" teve o seu nome alterado para "${response.docs[i].name}".`
              );

              _showDialog = true;
            }

            if (product.quantity > response.docs[i].quantity) {
              _messages.push(
                ` O produto "${product.name}" não possui estoque suficiente. Estoque atual = ${response.docs[i].quantity}. Favor ajustar o carrinho para prosseguir.`
              );

              _showDialog = true;
            }

            if (!response.docs[i].active) {
              removeItem(product.sku);
              _messages.push(
                ` O produto "${product.name}" foi desativado e removido do seu carrinho.`
              );

              _showDialog = true;
            }
          }
          // Se não achar o produto, remover do carrinho
          const found = response.docs.find(
            (item: any) => item.id === product.id
          );
          if (!found) {
            removeItem(product.sku);
          }
        }
      });

      setDialogMessages(_messages);
      setShowDialog(_showDialog);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

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
      totalPrice={totalPrice}
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
            formattedTotalPrice={
              totalPrice > 0 ? currencyFormatter(totalPrice) : 'R$ 0,00'
            }
            cartEmpty={cartEmpty}
            loading={loading}
            clearCart={clearCart}
            totalPrice={totalPrice}
          />
        </Form>
        <Dialog
          open={showDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Atenção</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogMessages.map((message: string, idx: number) => (
                <p key={idx}>{message}</p>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Paper>
  );
};

export default CartSummary;
