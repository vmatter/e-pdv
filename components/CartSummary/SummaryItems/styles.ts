import styled from '@emotion/styled';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

export const ItemsList = styled(List)`
  max-height: calc(100vh - 335px);
  overflow-y: auto;

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
`;

export const ItemWrapper = styled(ListItem as any)`
  padding-right: 8rem;
`;

export const ProductIcon = styled.img``;

export const ItemDescription = styled(ListItemText)`
  margin-right: 10px;
  flex: 0.7;

  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ItemTotal = styled(ListItemText)`
  flex: 0.3;
`;
