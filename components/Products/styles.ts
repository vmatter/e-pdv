import styled from '@emotion/styled';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

export const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1.5rem;
  justify-content: center;
  overflow-y: auto;
  width: 100%;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  ${({ theme }) => `${theme.breakpoints.down('md')} {
   height: calc(100% - 183px);
   }`}
`;

export const ProductWrapper = styled.div`
  height: fit-content;
  width: 300px;
`;

export const Title = styled(Typography)`
  margin-left: 2rem;
`;

export const StyledSnackBar = styled(Snackbar)`
  width: 400px;

  ${({ theme }) => `${theme.breakpoints.down('md')} {
    width: 100%;
   }`}
`;
