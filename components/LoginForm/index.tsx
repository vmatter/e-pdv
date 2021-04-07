import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Card } from '@material-ui/core';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import { useRouter } from 'next/router';
import {
  Wrapper,
  HeaderWrapper,
  InputWrapper,
  FormHeader,
  LogoWrapper,
  LogoImg,
} from './styles';

const LoginForm = () => {
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showUserError, setShowUserError] = useState(false);
  const [showPassError, setShowPassError] = useState(false);

  useEffect(() => {
    loggedIn && router.push('/');
  }, [loggedIn]);

  const onSubmit = async (e: any) => {
    e?.preventDefault();

    setShowWarning(false);

    console.log(`user`, user);
    console.log(`password`, password);

    if (user === '' || password === '') {
      user === '' && setShowUserError(true);
      password === '' && setShowPassError(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);

        // TODO: replace this with login validation
        if (user !== 'admin' && password !== 'admin') {
          setShowWarning(true);
        } else {
          setLoggedIn(true);
        }
      }, 2000);
    }
  };

  return (
    <Wrapper>
      <Card variant="outlined" elevation={2}>
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
            id="input-user"
            data-testid="input-user"
            variant="outlined"
            type="text"
            name="username"
            label="usuário"
            placeholder="ex: giselamd"
            fullWidth
            helperText={showUserError && 'Este campo deve ser preenchido.'}
            error={showUserError || showWarning}
            onChange={(e: any) => {
              setShowUserError(false);
              setShowWarning(false);
              setUser(e.target.value);
            }}
          />
          <TextField
            id="input-password"
            data-testid="input-password"
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
      </Card>
    </Wrapper>
  );
};

export default LoginForm;
