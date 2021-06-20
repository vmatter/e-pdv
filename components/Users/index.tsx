import { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/core/Alert';
import UsersTable from './UsersTable';
import BasicPagination from '../BasicPagination';
import { fetchGetJSON, fetchPostJSON } from '../../utils/api-helpers';
import {
  Wrapper,
  HeaderWrapper,
  InputWrapper,
  StyledSnackBar,
  StyledCard,
} from './styles';

const Users = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [openSucessAlert, setOpenSucessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [showNameError, setShowNameError] = useState(false);
  const [showScopeError, setShowScopeError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [name, setName] = useState('');
  const [scope, setScope] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [renderedUsers, setRenderedUsers]: any = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers]: any = useState(null);
  const [totalUsers, setTotalUsers]: any = useState(0);
  const [page, setPage]: any = useState(1);

  const { API_URL } = process.env;

  const fetchUsers = async () => {
    const response = await fetchGetJSON(`${API_URL}users?limit=2&page=`+page);

    setTotalUsers(Math.ceil(parseInt(response.totalDocs)/2));
    if (!response.message) {
      setUsers(response.docs);
    }
    setLoaded(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    users &&
      setRenderedUsers(
        users
      );
  }, [users]);

  const handleClose = () => {
    setOpenSucessAlert(false);
    setOpenErrorAlert(false);
  };

  const handleChangePage = (e: any, newPage: any) => {
    e?.preventDefault();

    console.log(newPage);

    setPage(newPage);
    fetchUsers();
  };

  const onSubmit = async (e: any) => {
    e?.preventDefault();

    if (name === '' || scope === '' || email === '' || password === '') {
      name === '' && setShowNameError(true);
      scope === '' && setShowScopeError(true);
      email === '' && setShowEmailError(true);
      password === '' && setShowPasswordError(true);
    } else {
      const body = {
        name: name,
        email: email,
        password: password,
        scope: [scope],
      };

      const response = await fetchPostJSON(`${API_URL}users`, body);

      if (!response.message) {
        openSucessAlert && setOpenSucessAlert(false);
        setOpenSucessAlert(true);

        setName('');
        setScope('');
        setEmail('');
        setPassword('');

        fetchUsers();
      } else {
        openErrorAlert && setOpenErrorAlert(false);
        setOpenErrorAlert(true);
      }
    }
  };

  return (
    <Wrapper>
      <StyledCard variant="outlined" elevation={2}>
        <HeaderWrapper>
          <Typography variant="h4" paddingBottom={1}>
            Gerenciar usuários
          </Typography>
          <Typography component="p">
            Crie usuários do tipo Administrador ou Operador de Caixa
          </Typography>
        </HeaderWrapper>

        <StyledSnackBar
          open={openSucessAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Usuário atualizado com sucesso!
          </Alert>
        </StyledSnackBar>
        <StyledSnackBar
          open={openErrorAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            Houve um erro ao atualizar o usuário :(
          </Alert>
        </StyledSnackBar>

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
            <MenuItem value={'admin'}>Administrador</MenuItem>
            <MenuItem value={'buyer'}>Operador de Caixa</MenuItem>
          </TextField>

          <TextField
            id="input-name"
            variant="outlined"
            type="text"
            name="name"
            label="Nome"
            placeholder="ex: João da Silva"
            fullWidth
            value={name}
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
            value={email}
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
            value={password}
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
      </StyledCard>

      <UsersTable
        isAdmin
        loaded={loaded}
        renderedUsers={renderedUsers}
        updateList={fetchUsers}
      />

      <BasicPagination
        count={totalUsers}
        page={page}
        onChangePage={handleChangePage}
      />

    </Wrapper>
  );
};

export default Users;
