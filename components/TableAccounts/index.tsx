import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
//import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fetchGetJSON } from '../../utils/api-helpers';
import { Wrapper, StyledTableCell, StyledTableRow } from './styles';

const { API_URL } = process.env;

const TableAccounts = ({ isAdmin = false }) => {

  const [users, setUsers]: any = useState(null);
  const [renderedUsers, setRenderedUsers]: any = useState(null);
  const [arrayUsers]: any = [];

  const fetchUsers = async () => {
    const response = await fetchGetJSON(`${API_URL}users`);
    if (!response.message) {

      for(let i=0; i<response.docs.length; i++){
        arrayUsers.push(createData(response.docs[i]["name"], response.docs[i]["email"], 'admin'));
      }

      setUsers(response.docs);
    }
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
 
  function createData(
    name: string,
    email: string,
    scope: string,
  ) {
    return { name, email, scope};
  }
  
  const rows = [
    createData('Admin', 'admin@admin.com', 'admin'),
    createData('Anderson', 'anderson@admin.com', 'admin'),
    createData('Anderson Ludwig', 'ludwig@admin.com', 'admin'),
  ];

  return (
    <Wrapper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Tipo Usuário</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrayUsers.map((user : any) => (
              <StyledTableRow key={user.name}>
                <StyledTableCell component="th" scope="row">{user.name}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.scope}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export default TableAccounts;
