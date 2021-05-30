import { useState, useEffect, ChangeEvent } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { fetchPostJSON } from 'utils/api-helpers';
import { Product } from '../Products';
import { Alert } from '../../components/Alert';
import { NumberInput } from '../../components/NumberInput';
import { ReponsiveDialog } from '../../components/Dialog';
import { useDebounce } from '../../hooks/useDebounce';
import { ProductName, StyledSnackBar } from './styles';

const { API_URL } = process.env;

type Props = {
  product: Product;
  isAdmin: boolean;
  updateList: () => Promise<void>;
};

type FormValues = {
  image: string;
  name: string;
  price: number;
};

const ProductItem = ({ product, isAdmin = false, updateList }: Props) => {
  const { addItem, removeItem } = useShoppingCart();
  const [openSucessAlert, setOpenSucessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [changedValues, setChangedValues] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [imgValue, setImgValue] = useState('');
  const [debouncedValue, values, setValues] = useDebounce<FormValues>(
    {
      image: product.images?.[0] || '',
      name: product.name,
      price: product.price,
    },
    1000
  );

  useEffect(() => {
    product?.images?.[0] && setImgValue(product.images[0]);
  }, [product.images]);

  useEffect(() => {
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

  const updateImage = async () => {
    const response = await fetchPutProduct({ images: [imgValue] });
    !response.message && updateList();
    setOpenDialog(false);
    handleAlerts(response);
  };

  const dialogFooter = (
    <>
      <Button
        size="small"
        color="primary"
        onClick={() => {
          setImgValue('');
          setOpenDialog(false);
        }}
      >
        Cancelar
      </Button>
      <Button size="small" color="primary" onClick={updateImage}>
        Atualizar
      </Button>
    </>
  );

  const dialogContent = (
    <TextField
      defaultValue={product?.images?.[0] || ''}
      fullWidth
      multiline
      variant="standard"
      margin="dense"
      inputProps={{ 'aria-label': 'Link da imagem' }}
      onChange={({ target }) => setImgValue(target.value)}
    />
  );

  return (
    <div>
      <Card>
        {isAdmin ? (
          <CardActionArea onClick={() => setOpenDialog(true)}>
            <Tooltip disableFocusListener title="Clique para editar a imagem">
              <CardMedia
                component="img"
                alt={product.name}
                image={product.images?.[0] || '/placeholder-image.png'}
                height="140"
                width="140"
              />
            </Tooltip>
          </CardActionArea>
        ) : (
          <CardMedia
            component="img"
            alt={product.name}
            image={product.images?.[0] || '/placeholder-image.png'}
            height="140"
            width="140"
          />
        )}
        <CardContent>
          {isAdmin ? (
            <TextField
              defaultValue={product.name}
              name="name"
              fullWidth
              variant="standard"
              margin="dense"
              inputProps={{ 'aria-label': `Nome do produto: ${product.name}` }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
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
              Remover
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => addItem(product as any)}
            >
              Adicionar
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
      <ReponsiveDialog
        title="Editar Imagem"
        content={dialogContent}
        footer={dialogFooter}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </div>
  );
};

export default ProductItem;
