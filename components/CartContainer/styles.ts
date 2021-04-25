import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: calc(100% - 60px);

  ${({ theme }) => `${theme.breakpoints.up('md')} {
    display: flex;
   }`}
`;
