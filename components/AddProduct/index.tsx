import { useState, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import { fetchPostJSON } from '../../utils/api-helpers';
import { NumberInput } from '../NumberInput';
import {
  Wrapper,
  StyledCard,
  HeaderWrapper,
  Form,
  FieldsWrapper,
  FieldContext,
} from './styles';

type Props = {
  handleAlerts: (res: any) => void;
  updateList: () => Promise<void>;
};

type ErrorFields = {
  sku: boolean;
  name: boolean;
  price: boolean;
  quantity: boolean;
};

const AddProduct = ({ handleAlerts, updateList }: Props) => {
  const [values, setValues] = useState() as any;
  const [errorObject, setErrorObject] = useState<ErrorFields>({
    sku: false,
    name: false,
    price: false,
    quantity: false,
  });
  const [showWarning, setShowWarning] = useState(false);

  const { API_URL } = process.env;

  const createProduct = (body: any) =>
    fetchPostJSON(`${API_URL}products`, body);

  const hasNoErrors = () => {
    return Object.values(errorObject).every(value => !value);
  };

  const onSubmit = async () => {
    const body = {
      sku: values?.sku,
      name: values?.name,
      price: values?.price / 100,
      images: values?.image ? [values?.image] : undefined,
      quantity: values?.quantity,
    };

    setErrorObject({
      sku: !values?.sku || values.sku === '',
      name: !values?.name || values.name === '',
      price: !values?.price || values.price === '',
      quantity: !values?.quantity || values.quantity === '',
    });

    if (hasNoErrors()) {
      const response = await createProduct(body);
      handleAlerts(response);

      setValues({});
      updateList();
    } else {
      setShowWarning(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setErrorObject({
      ...errorObject,
      [event.target.name]: false,
    });

    showWarning && setShowWarning(false);
  };

  return (
    <Wrapper>
      <StyledCard variant="outlined">
        <HeaderWrapper>
          <Typography variant="h4" paddingBottom={1}>
            Adicionar Produto
          </Typography>
          <Typography component="p">
            Preencha o formulário abaixo para criar um novo produto.
          </Typography>
        </HeaderWrapper>

        {showWarning && (
          <Alert severity="error">
            <AlertTitle>Erro</AlertTitle>
            Preencha os campos obrigatórios.
          </Alert>
        )}

        <Form autoComplete="off">
          <FieldsWrapper>
            <FieldContext>
              <TextField
                name="name"
                label="Nome do produto *"
                placeholder="Meu produto X"
                variant="standard"
                margin="dense"
                inputProps={{ 'aria-label': 'Nome do produto' }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                value={values?.name || ''}
                error={errorObject.name}
              />

              <NumberInput
                id="add-product-price"
                label="Preço do produto *"
                placeholder="R$ 50,00"
                handleChange={handleChange}
                value={values?.price || ''}
                error={errorObject.price}
              />

              <TextField
                name="quantity"
                type="number"
                placeholder="0"
                label="Quantidade *"
                variant="standard"
                margin="dense"
                inputProps={{ 'aria-label': 'Quantidade do produto' }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                value={values?.quantity || ''}
                error={errorObject.quantity}
              />

              <TextField
                name="sku"
                placeholder="sku_do_produto"
                label="SKU do produto *"
                variant="standard"
                margin="dense"
                inputProps={{ 'aria-label': 'Quantidade do produto' }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                value={values?.sku || ''}
                error={errorObject.sku}
              />
            </FieldContext>

            <TextField
              name="image"
              label="Link da imagem do produto"
              placeholder="https://"
              multiline
              variant="standard"
              margin="dense"
              inputProps={{ 'aria-label': 'Link da imagem' }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              value={values?.image || ''}
            />
          </FieldsWrapper>

          <Button
            id="button-save"
            type="button"
            data-testid="button-save"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Salvar
          </Button>
        </Form>
      </StyledCard>
    </Wrapper>
  );
};

export default AddProduct;
