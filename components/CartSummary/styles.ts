import styled from '@emotion/styled';

export const Container = styled.aside`
  min-width: 400px;
`;

export const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const FormContent = styled.div`
  flex: 1;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const SummaryWrapper = styled.div`
  padding: 40px 20px;
  background-color: ${props => props.theme.colors.backgroundGray};
`;
