import styled from '@emotion/styled';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';

export const Wrapper = styled.div`
  padding: 2rem;
`;

export const StyledCard = styled(Card)`
  padding: 2rem;
`;

export const HeaderWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const InputWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  gap: 12px;
`;

export const LogoWrapper = styled.a`
  height: 100%;
  margin: auto 25px;
`;

export const LogoImg = styled.img`
  height: 45px;
`;

export const StyledSnackBar = styled(Snackbar)`
  width: 400px;

  ${({ theme }) => `${theme.breakpoints.down('md')} {
    width: 100%;
   }`}
`;
