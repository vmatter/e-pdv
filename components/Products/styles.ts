import styled from '@emotion/styled';

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
    max-height: calc(100% - 225px);
   }`}
`;

export const ProductWrapper = styled.div`
  height: fit-content;
  width: 300px;
`;
