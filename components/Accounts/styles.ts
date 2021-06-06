import styled from '@emotion/styled';
import Snackbar from '@material-ui/core/Snackbar';

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
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

export const StyledSnackBar = styled(Snackbar)`
  width: 400px;

  ${({ theme }) => `${theme.breakpoints.down('md')} {
    width: 100%;
   }`}
`;