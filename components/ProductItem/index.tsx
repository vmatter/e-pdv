import { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { fetchPostJSON } from 'utils/api-helpers';
import { Product } from '../Products';
import { Alert } from '../../components/Alert';
import { NumberInput } from '../../components/NumberInput';
import { useDebounce } from '../../hooks/useDebounce';
import { ProductName, StyledSnackBar } from './styles';

const { API_URL } = process.env;

type Props = {
  product: Product;
  isAdmin: boolean;
};

type FormValues = {
  image: string;
  name: string;
  price: number;
};

const ProductItem = ({ product, isAdmin = false }: Props) => {
  const { addItem, removeItem } = useShoppingCart();
  const [openSucessAlert, setOpenSucessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [changedValues, setChangedValues] = useState(false);
  const [debouncedValue, values, setValues] = useDebounce<FormValues>(
    {
      image: product.images?.[0] || '',
      name: product.name,
      price: product.price,
    },
    1000
  );

  useEffect(() => {
    console.log(`changedValues`, changedValues);
    changedValues && editProduct();
  }, [debouncedValue.price, debouncedValue.image, debouncedValue.name]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setChangedValues(true);
  };

  const handleClose = () => {
    setOpenSucessAlert(false);
    setOpenErrorAlert(false);
  };

  const fetchPutProduct = (body: any) =>
    fetchPostJSON(`${API_URL}products/${product.id}`, body, true);

  const handleAlerts = (res: any) => {
    if (!res.message) {
      openSucessAlert && setOpenSucessAlert(false);
      setOpenSucessAlert(true);
    } else {
      openErrorAlert && setOpenErrorAlert(false);
      setOpenErrorAlert(true);
    }
  };

  const editProduct = async () => {
    const response = await fetchPutProduct(values);
    handleAlerts(response);
  };

  const inactivateProduct = async () => {
    const response = await fetchPutProduct({ active: false });
    handleAlerts(response);
  };

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          alt={product.name}
          image={product.images?.[0] || '/placeholder-image.png'}
          height="140"
          width="140"
        />
        <CardContent>
          {isAdmin ? (
            <TextField
              defaultValue={product.name}
              fullWidth
              variant="standard"
              margin="dense"
              inputProps={{ 'aria-label': `Nome do produto: ${product.name}` }}
            />
          ) : (
            <Tooltip title={product.name}>
              <ProductName gutterBottom variant="h5">
                {product.name}
              </ProductName>
            </Tooltip>
          )}
          {isAdmin ? (
            <NumberInput
              defaultValue={product.price}
              handleChange={handleChange}
            />
          ) : (
            <Typography component="p">R${product.price}</Typography>
          )}
        </CardContent>

        {isAdmin ? (
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => inactivateProduct()}
            >
              Inativar produto
            </Button>
          </CardActions>
        ) : (
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => removeItem(product.sku)}
            >
              Remove
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => addItem(product as any)}
            >
              Add Item
            </Button>
          </CardActions>
        )}
      </Card>
      <StyledSnackBar
        open={openSucessAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Produto atualizado com sucesso!
        </Alert>
      </StyledSnackBar>
      <StyledSnackBar
        open={openErrorAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Houve um erro ao atualizar o produto :(
        </Alert>
      </StyledSnackBar>
    </>
  );
};

export default ProductItem;
