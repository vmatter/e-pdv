import styled from '@emotion/styled';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

export const Container = styled.aside`
  min-width: 430px;
  height: 100%;
`;

export const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const FormContent = styled.div`
  flex: 1;
  padding-top: 1rem;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const SummaryWrapper = styled.div`
  padding: 40px 20px;
  background-color: ${props => props.theme.colors.backgroundGray};

  ${({ theme }) => `${theme.breakpoints.down('md')} {
    width: 100%;
   }`}
`;

export const InfoWrapper = styled.div`
  margin-bottom: 20px;
`;

export const InfoItem = styled(Typography)`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

export const StyledSnackBar = styled(Snackbar)`
  width: 400px;

  ${({ theme }) => `${theme.breakpoints.down('md')} {
    width: 100%;
   }`}
`;
