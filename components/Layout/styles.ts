import styled from '@emotion/styled';
import { ContainerProps } from '.';

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100vh;
  background-color: ${props =>
    props.hasBgColor ? props.theme.colors.backgroundGray : 'none'};
`;

export const Header = styled.header`
  height: 60px;
  position: sticky;
`;

export const DesktopSection = styled.div`
  display: none;
  ${({ theme }) => `${theme.breakpoints.up('md')} {
   display: flex;
  }`}
`;

export const MobileSection = styled.div`
  display: flex;
  ${({ theme }) => `${theme.breakpoints.up('md')} {
   display: none;
  }`}
`;
