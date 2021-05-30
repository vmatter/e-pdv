import styled from '@emotion/styled';
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const FieldContext = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  & > div {
    margin-right: 2rem;
  }

  ${({ theme }) => `${theme.breakpoints.down('md')} {
    flex-direction: column;
   }`}
`;
