import styled from '@emotion/styled';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding-top: 2rem;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormHeader = styled.div`
  padding: 40px 25px;
`;

export const InputWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px 25px;
  gap: 12px;
`;

export const LogoWrapper = styled.a`
  height: 100%;
  margin: auto 25px;
`;

export const LogoImg = styled.img`
  height: 45px;
`;

export const StyledTableCell = styled(TableCell)(() => ({
  /*[`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },*/
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const StyledSnackBar = styled(Snackbar)`
  width: 400px;

  ${({ theme }) => `${theme.breakpoints.down('md')} {
    width: 100%;
   }`}
`;

export const Title = styled(Typography)`
  margin-left: 2rem;
`;

export const LoaderWrapper = styled.div`
  margin: 0 auto;
`;
