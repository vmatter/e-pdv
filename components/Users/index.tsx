import { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/core/Alert';
import UsersTable from './UsersTable';
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
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers]: any = useState(null);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const { API_URL } = process.env;

  const fetchUsers = async (page = 0, rows = 5) => {
    const fetchPage = page + 1;
    const response = await fetchGetJSON(
      `${API_URL}users?limit=` + rows + `&page=` + fetchPage
    );

    if (!response.message) {
      setTotalUsers(response.totalDocs);
      setUsers(response.docs);
    }

    setLoaded(true);
  };

  useEffect(() => {
    fetchUsers(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleClose = () => {
    setOpenSucessAlert(false);
    setOpenErrorAlert(false);
  };

  const handleChangePage = (e: any, newPage: number) => {
    e?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

        fetchUsers(page, rowsPerPage);
      } else {
        openErrorAlert && setOpenErrorAlert(false);
        setOpenErrorAlert(true);
      }
    }
  };

  return (
    <Wrapper>
      <StyledCard variant="outlined">
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
        renderedUsers={users}
        updateList={fetchUsers}
        count={totalUsers}
        page={page}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Wrapper>
  );
};

export default Users;
