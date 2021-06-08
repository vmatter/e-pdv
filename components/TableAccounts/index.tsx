import { useEffect, useState, ChangeEvent } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fetchGetJSON, fetchPostJSON } from '../../utils/api-helpers';
import { Wrapper, StyledTableCell, StyledTableRow, StyledSnackBar } from './styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { Alert } from '../Alert';

const { API_URL } = process.env;

export type User = {
  account: string;
  active: boolean;
  createdAt: string;
  email: string;
  id: string;
  isAdmin: boolean;
  name: string;
  scope: Array<string>;
  updateAt: string;
};

const TableAccounts = ({ isAdmin = false }) => {

  const [openSucessAlert, setOpenSucessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [users, setUsers]: any = useState(null);
  const [renderedUsers, setRenderedUsers]: any = useState(null);
  const [loaded, setLoaded] = useState(false);

  const fetchUsers = async () => {
    const response = await fetchGetJSON(`${API_URL}users`);
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
        isAdmin ? users : users.filter((user: any) => !!user.active)
      );
  }, [users]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>, id: any, campo: any) => {
    if(event.target.value !== ''){
      const response = await fetchPutUser(id, { [campo]: event.target.value });
      !response.message && fetchUsers();
      handleAlerts(response);
    }
    else{
      setOpenErrorAlert(true);
    }
  };    

  const toggleActive = async (id: any, active: any) => {
    const response = await fetchPutUser(id, { active: !active });
    !response.message && fetchUsers();
    handleAlerts(response);
  };

  const fetchPutUser = (id:any, body: any) =>
    fetchPostJSON(`${API_URL}users/${id}`, body, true);

  const handleClose = () => {
    setOpenSucessAlert(false);
    setOpenErrorAlert(false);
  };

  const handleAlerts = (res: any) => {
    if (!res.message) {
      openSucessAlert && setOpenSucessAlert(false);
      setOpenSucessAlert(true);
    } else {
      openErrorAlert && setOpenErrorAlert(false);
      setOpenErrorAlert(true);
    }
  };

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Tipo Usuário</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded ? (
              renderedUsers ?
                (renderedUsers.map((user : User) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {isAdmin ? (
                    <TextField
                      defaultValue={user.name}
                      disabled={!user.active}
                      name="name"
                      fullWidth
                      variant="standard"
                      margin="dense"
                      inputProps={{ 'aria-label': `Nome do usuário: ${user.name}` }}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, user.id, 'name')}
                    />
                    ) : ( 
                      user.name
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  {isAdmin ? (
                    <TextField
                      defaultValue={user.email}
                      disabled={!user.active}
                      name="email"
                      fullWidth
                      variant="standard"
                      margin="dense"
                      inputProps={{ 'aria-label': `E-mail do usuário: ${user.email}` }}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, user.id, 'email')}
                    />
                    ) : ( 
                      user.email
                  )}
                </StyledTableCell>
                <StyledTableCell>
                {isAdmin ? (
                  <TextField
                    defaultValue={user.scope}
                    disabled={!user.active}
                    select
                    name="scope"
                    fullWidth
                    variant="standard"
                    margin="dense"
                    inputProps={{ 'aria-label': `Tipo do usuário: ${user.scope}` }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, user.id, 'scope')}
                  >
                    <MenuItem value={"admin"}>Administrador</MenuItem>
                    <MenuItem value={"buyer"}>Operador de Caixa</MenuItem>
                  </TextField>
                  ) : ( 
                    user.scope
                )}
                </StyledTableCell>
                <StyledTableCell>
                  <Button size="small" color="primary" onClick={() => toggleActive(user.id, user.active)}>
                    {user.active ? 'Inativar' : 'Ativar'} usuário
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
                ))
              ) : (
                <div>Sem usuários</div>
              )
            ): (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
    </Wrapper>
  );
};

export default TableAccounts;
