import { useState } from 'react';
import { Button, TextField, Typography, Card } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import { createUsers } from '../../utils/api-helpers';
import {
  Wrapper,
  HeaderWrapper,
  InputWrapper,
  FormHeader
} from './styles';

const Accounts = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showNameError, setShowNameError] = useState(false);
  const [showScopeError, setShowScopeError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [name, setName] = useState('');
  const [scope, setScope] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: any) => {
    e?.preventDefault();

    if (name === '' || scope === '' || email === '' || password === '') {
      name === '' && setShowNameError(true);
      scope === '' && setShowScopeError(true);
      email === '' && setShowEmailError(true);
      password === '' && setShowPasswordError(true);
    }
    else{
      const response = await createUsers({
        name,
        email,
        password,
        "scope":[scope]
      });

      if (!response.message) {
        setShowError(false);
      } else {
        setShowError(true);
      }
    }
  };

  return (
    <Wrapper>
      <Card variant="outlined" elevation={2}>
        <HeaderWrapper>
          <FormHeader>
            <Typography variant="h4" paddingBottom={1}>
              Gerenciar usuários
            </Typography>
            <Typography component="p">
              Crie usuários do tipo Administrador ou Operador de Caixa
            </Typography>
          </FormHeader>
        </HeaderWrapper>
        
        {showError && (
          <Alert severity="error">
            <AlertTitle>Erro</AlertTitle>
            Erro ao cadastrar usuário, tente novamente.
          </Alert>
        )}

        <InputWrapper autoComplete="off">

          <TextField
            id="select-type-scope"
            variant="outlined"
            name="scope"
            label="Tipo Usuário"
            fullWidth
            value={scope}
            select
            helperText={showScopeError && 'Este campo deve ser preenchido.'}
            error={showScopeError || showWarning}
            onChange={(e: any) => {
              setShowScopeError(false);
              setShowWarning(false);
              setScope(e.target.value);
            }}
            inputProps={{
              'data-testid': 'select-type-person',
            }}
          >
            <MenuItem value="">Selecione</MenuItem>
            <MenuItem value={"admin"}>Administrador</MenuItem>
            <MenuItem value={"buyer"}>Operador de Caixa</MenuItem>
          </TextField> 

          <TextField
            id="input-name"
            variant="outlined"
            type="text"
            name="name"
            label="Nome"
            placeholder="ex: João da Silva"
            fullWidth
            helperText={showNameError && 'Este campo deve ser preenchido.'}
            error={showNameError || showWarning}
            onChange={(e: any) => {
              setShowNameError(false);
              setShowWarning(false);
              setName(e.target.value);
            }}
            inputProps={{
              'data-testid': 'input-name',
            }}
          />       
         
          <TextField
            id="input-email"
            variant="outlined"
            type="text"
            name="email"
            label="E-mail"
            placeholder="ex: exemplo@gmail.com"
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
            label="Senha"
            fullWidth
            helperText={showPasswordError && 'Este campo deve ser preenchido.'}
            error={showPasswordError || showWarning}
            onChange={(e: any) => {
              setShowPasswordError(false);
              setShowWarning(false);
              setPassword(e.target.value);
            }}
            inputProps={{
              'data-testid': 'input-password',
            }}
          />
          
          <Button
            id="button-save"
            data-testid="button-save"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Salvar
          </Button>
        </InputWrapper>
      </Card>
    </Wrapper>
  );
};

export default Accounts;
