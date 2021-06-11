import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Card, Link } from '@material-ui/core';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import { useRouter } from 'next/router';
import { authRequest } from '../../utils/api-helpers';
import {
  Wrapper,
  HeaderWrapper,
  InputWrapper,
  FormHeader,
  LogoWrapper,
  LogoImg,
  LinkWrapper,
} from './styles';

const LoginForm = () => {
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPassError, setShowPassError] = useState(false);

  useEffect(() => {
    loggedIn && router.push('/');
  }, [loggedIn]);

  const onSubmit = async (e: any) => {
    e?.preventDefault();

    setShowWarning(false);

    if (email === '' || password === '') {
      email === '' && setShowEmailError(true);
      password === '' && setShowPassError(true);
    } else {
      setLoading(true);

      const response = await authRequest({
        email,
        password,
      });

      if (!response.message) {
        setLoggedIn(true);
      } else {
        setShowWarning(true);
      }
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Card variant="outlined">
        <HeaderWrapper>
          <FormHeader>
            <Typography variant="h4" paddingBottom={1}>
              Log in
            </Typography>
            <Typography component="p">
              Faça log in na plataforma e-PDV
            </Typography>
          </FormHeader>

          <LogoWrapper>
            <LogoImg src="/pdv-logo.png" />
          </LogoWrapper>
        </HeaderWrapper>
        {showWarning && (
          <Alert severity="error">
            <AlertTitle>Erro</AlertTitle>
            Usuário ou senha não encontrados, tente novamente.
          </Alert>
        )}
        <InputWrapper noValidate autoComplete="off">
          <TextField
            id="input-email"
            variant="outlined"
            type="text"
            name="email"
            label="email"
            placeholder="ex: johndoe@gmail.com"
            fullWidth
            helperText={showEmailError && 'Este campo deve ser preenchido.'}
            error={showEmailError || showWarning}
            onChange={(e: any) => {
              setShowEmailError(false);
              setShowWarning(false);
              setEmail(e.target.value);
            }}
            inputProps={{
              'data-testid': 'input-email',
            }}
          />
          <TextField
            id="input-password"
            variant="outlined"
            type="password"
            name="password"
            label="senha"
            fullWidth
            helperText={showPassError && 'Este campo deve ser preenchido.'}
            error={showPassError || showWarning}
            onChange={(e: any) => {
              setShowPassError(false);
              setShowWarning(false);
              setPassword(e.target.value);
            }}
            inputProps={{
              'data-testid': 'input-password',
            }}
          />
          <Button
            id="button-login"
            data-testid="button-login"
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={onSubmit}
          >
            Log In
          </Button>
        </InputWrapper>
        <LinkWrapper>
          <Link href="/account">Criar nova conta</Link>
        </LinkWrapper>
      </Card>
    </Wrapper>
  );
};

export default LoginForm;
