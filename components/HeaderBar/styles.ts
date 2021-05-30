import styled from '@emotion/styled';
import { alpha } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

export const FlexGrow = styled.div`
  flex-grow: 1;
`;

export const MenuButton = styled(IconButton)`
  margin-right: ${({ theme }) => theme.spacing(2)};
`;

export const LogoWrapper = styled.a`
  height: 100%;
  cursor: pointer;
`;

export const LogoImg = styled.img`
  height: 45px;
  cursor:pointer;
`;

export const Search = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background-color: ${({ theme }) => alpha(theme.palette.common.white, 0.15)};
  &:hover {
    background-color: ${({ theme }) => alpha(theme.palette.common.white, 0.25)};
  }
  margin-right: ${({ theme }) => theme.spacing(2)};
  margin-left: 0;

  ${({ theme }) => `${theme.breakpoints.up('sm')} {
    margin-left: ${theme.spacing(2)};
    width: auto;
  }`}
`;

export const SearchIconWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(0, 2)};
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CustomInput = styled(InputBase)`
  color: inherit;
  padding: ${({ theme }) => theme.spacing(1, 1, 1, 0)};
  padding-left: ${({ theme }) => `calc(1em + ${theme.spacing(4)})`};
  transition: ${({ theme }) => theme.transitions.create('width')};
  width: 100%;

  ${({ theme }) => `${theme.breakpoints.up('md')} {
  width: 20ch
  }`}
`;
