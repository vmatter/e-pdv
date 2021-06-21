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
import { fetchPostJSON } from '../../utils/api-helpers';
import { currencyFormatter } from '../../utils/currency';
import { Product } from '../Products';
import { NumberInput } from '../../components/NumberInput';
import { ReponsiveDialog } from '../../components/Dialog';
import { useDebounce } from '../../hooks/useDebounce';
import { ProductName } from './styles';

const { API_URL } = process.env;

type Props = {
  product: Product;
  isAdmin: boolean;
  updateList: () => Promise<void>;
  handleAlerts: (res: any) => void;
};

type FormValues = {
  image: string;
  name: string;
  price: number;
  sku: string;
  quantity: number;
};

const ProductItem = ({
  product,
  isAdmin = false,
  updateList,
  handleAlerts,
}: Props) => {
  const { addItem, decrementItem, cartDetails } = useShoppingCart();
  const [changedValues, setChangedValues] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [imgValue, setImgValue] = useState('');
  const [debouncedValue, values, setValues] = useDebounce<FormValues>(
    {
      image: product.images?.[0] || '',
      name: product.name,
      price: product.price,
      sku: product.sku,
      quantity: product.quantity,
    },
    1000
  );

  useEffect(() => {
    product?.images?.[0] && setImgValue(product.images[0]);
  }, [product.images]);

  useEffect(() => {
    changedValues && editProduct();
  }, [
    debouncedValue.price,
    debouncedValue.image,
    debouncedValue.name,
    debouncedValue.sku,
    debouncedValue.quantity,
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setChangedValues(true);
  };

  const fetchPutProduct = (body: any) =>
    fetchPostJSON(`${API_URL}products/${product.id}`, body, true);

  const editProduct = async () => {
    const { image, name, price, sku, quantity } = values;
    const response = await fetchPutProduct({
      image,
      name,
      price: price !== product.price ? price / 100 : price,
      sku,
      quantity,
    });
    handleAlerts(response);
  };

  const toggleActive = async () => {
    const response = await fetchPutProduct({ active: !product.active });
    !response.message && updateList();
    handleAlerts(response);
  };

  const updateImage = async () => {
    const response = await fetchPutProduct({
      images: imgValue !== '' ? [imgValue] : [],
    });
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
        {isAdmin && product.active ? (
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
              disabled={!product.active}
              name="name"
              label="Nome do produto"
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
              id={`price-${product.id}`}
              defaultValue={product.price}
              handleChange={handleChange}
              disabled={!product.active}
            />
          ) : (
            <Typography component="p">
              {currencyFormatter(product.price)}
            </Typography>
          )}
          {isAdmin && (
            <>
              <TextField
                name="quantity"
                type="number"
                label="Quantidade"
                variant="standard"
                margin="dense"
                inputProps={{ 'aria-label': 'Quantidade do produto' }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                defaultValue={product.quantity}
                disabled={!product.active}
              />

              <TextField
                name="sku"
                label="SKU do produto"
                variant="standard"
                margin="dense"
                inputProps={{ 'aria-label': 'Quantidade do produto' }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                defaultValue={product.sku}
                disabled={!product.active}
              />
            </>
          )}
        </CardContent>

        {isAdmin ? (
          <CardActions>
            <Button size="small" color="primary" onClick={() => toggleActive()}>
              {product.active ? 'Inativar' : 'Ativar'} Produto
            </Button>
          </CardActions>
        ) : (
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => decrementItem(product.sku, 1)}
            >
              Remover
            </Button>
            <Button
              size="small"
              color="primary"
              disabled={
                cartDetails[product.sku]
                  ? product.quantity <= cartDetails[product.sku]?.quantity
                  : false
              }
              onClick={() => addItem(product as any)}
            >
              Adicionar
            </Button>
          </CardActions>
        )}
      </Card>
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
