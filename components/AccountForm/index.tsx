import { useState } from 'react';
import { Button, TextField, Typography, Card } from '@material-ui/core';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Link from 'next/link';
import { postRequest } from '../../utils/api-helpers';
import {
  Wrapper,
  HeaderWrapper,
  FormHeader,
  LogoWrapper,
  LogoImg,
  InputWrapper,
  LinkWrapper,
} from '../LoginForm/styles';

type ErrorFields = {
  name: boolean;
  email: boolean;
  password: boolean;
};

const { API_URL } = process.env;

const AccountForm = () => {
  const [values, setValues] = useState() as any;
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorObject, setErrorObject] = useState<ErrorFields>({
    name: false,
    email: false,
    password: false,
  });

  const hasNoErrors = () => {
    return Object.values(errorObject).every(value => !value);
  };

  const createAccount = (body: any) => postRequest(`${API_URL}accounts`, body);

  const onSubmit = async () => {
    const body = {
      name: values?.name,
      email: values?.email,
      password: values?.password,
    };

    setErrorObject({
      name: !values?.name || values.name === '',
      email: !values?.email || values.email === '',
      password: !values?.password || values.password === '',
    });

    if (hasNoErrors()) {
      setLoading(true);
      const response = await createAccount(body);

      setValues({});
      setLoading(false);

      if (!response.message) {
        setShowSuccess(true);
      } else {
        setShowWarning(true);
      }
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
    showSuccess && setShowSuccess(false);
  };

  return (
    <Wrapper>
      <Card variant="outlined">
        <HeaderWrapper>
          <FormHeader>
            <Typography variant="h4" paddingBottom={1}>
              Conta
            </Typography>
            <Typography component="p">
              Crie uma conta para acessar o e-PDV
            </Typography>
          </FormHeader>

          <LogoWrapper>
            <LogoImg src="/pdv-logo.png" />
          </LogoWrapper>
        </HeaderWrapper>

        {showSuccess && (
          <Alert severity="success">
            <AlertTitle>Sucesso</AlertTitle>
            Conta criada com sucesso!
          </Alert>
        )}

        {showWarning && (
          <Alert severity="error">
            <AlertTitle>Erro</AlertTitle>
            Erro ao criar conta, tente novamente.
          </Alert>
        )}
        <InputWrapper noValidate autoComplete="off">
          <TextField
            id="input-name"
            variant="outlined"
            type="text"
            name="name"
            label="Nome"
            placeholder="ex: Joana Neves"
            fullWidth
            helperText={errorObject.name && 'Este campo deve ser preenchido.'}
            error={errorObject.name}
            value={values?.name || ''}
            onChange={handleChange}
            inputProps={{
              'data-testid': 'input-name',
            }}
          />
          <TextField
            id="input-email"
            variant="outlined"
            type="text"
            name="email"
            label="Email"
            placeholder="ex: joana.neves@gmail.com"
            fullWidth
            helperText={errorObject.email && 'Este campo deve ser preenchido.'}
            error={errorObject.email}
            value={values?.email || ''}
            onChange={handleChange}
            inputProps={{
              'data-testid': 'input-email',
            }}
          />
          <TextField
            id="input-password"
            variant="outlined"
            type="password"
            name="password"
            label="Senha"
            fullWidth
            helperText={
              errorObject.password && 'Este campo deve ser preenchido.'
            }
            error={errorObject.password}
            value={values?.password || ''}
            onChange={handleChange}
            inputProps={{
              'data-testid': 'input-password',
            }}
          />
          <Button
            id="button-account"
            data-testid="button-account"
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={onSubmit}
          >
            Criar
          </Button>
        </InputWrapper>
        <LinkWrapper>
          <Link href="/">
            <Button startIcon={<ArrowBack />}>Voltar</Button>
          </Link>
        </LinkWrapper>
      </Card>
    </Wrapper>
  );
};

export default AccountForm;
