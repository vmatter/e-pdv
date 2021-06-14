import { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useShoppingCart } from 'use-shopping-cart';
import { fetchPostJSON, fetchGetJSON } from '../../utils/api-helpers';
import { SummaryItems } from './SummaryItems';
import { Summary } from './Summary';
import { Container, Form, FormContent, StyledSnackBar } from './styles';
import SwipableSummary from './SwipableSummary';
import { currencyFormatter } from 'utils/currency';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const { API_URL } = process.env;

const CartSummary = () => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [cartProducts, setCartProducts] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    incrementItem,
    decrementItem,
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
        images: product.images,
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
    setShowWarning(false);
    setShowDialog(false);
  };

  console.log(cartDetails);

  var allProducts = "";
  Object.entries(cartDetails).map(product => {
    allProducts += product[1]["id"]+",";
  });

  allProducts = allProducts.substr(0, allProducts.length-1);

  const fetchCartProducts = async () => {
    const response = await fetchGetJSON(`${API_URL}products?id=`+allProducts+`&toPaginate=false`);
    if (!response.message) {
      setCartProducts(response.docs);
      
      var _showDialog = false;
      var _message = "";

      Object.entries(cartDetails).map(product => {

        for(var i=0; i<response.docs.length; i++){

          if(product[1]["id"] == response.docs[i]["id"]){
            
            if(product[1]["price"] != response.docs[i]["price"]){
              decrementItem(product[1].sku, product[1].quantity);
              addItem(response.docs[i], product[1].quantity);
              _message += "\r\n - O produto "+product[1]["name"]+" teve o seu pre\u00e7o alterado para R$ "+response.docs[i]["price"].toFixed(2).replace(".", ",")+".";
              _showDialog = true;
            }

            if(product[1]["name"] != response.docs[i]["name"]){
              decrementItem(product[1].sku, product[1].quantity);
              addItem(response.docs[i], product[1].quantity);
              _message += "\r\n - O produto "+product[1]["name"]+" teve o seu nome alterado para "+response.docs[i]["name"]+".";
              _showDialog = true;
            }

            if(product[1]["quantity"] > response.docs[i]["quantity"]){
              _message += "\r\n - O produto "+product[1]["name"]+" n\u00e3o possui estoque suficiente (estoque atual: "+response.docs[i]["quantity"]+"), favor ajustar o carrinho para prosseguir.";
              _showDialog = true;
            }

            if(!response.docs[i]["active"]){
              _message += "\r\n - O produto "+product[1]["name"]+" foi desativado e removido do seu carrinho.";
              _showDialog = true;
            }

          }
        }
      });

      setDialogMessage(_message);
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
      <Dialog
        open={showDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Atenção
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Ok</Button>
        </DialogActions>
      </Dialog>
      </Container>
    </Paper>
  );
};

export default CartSummary;
