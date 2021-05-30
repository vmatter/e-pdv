import styled from '@emotion/styled';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

export const StyledSnackBar = styled(Snackbar)`
  width: 400px;

  ${({ theme }) => `${theme.breakpoints.down('md')} {
    width: 100%;
   }`}
`;

export const ProductName = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
