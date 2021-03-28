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

export const Content = styled.div`
  margin: 0 auto;
`;

export const LogoWrapper = styled.a`
  height: 100%;
`;

export const LogoImg = styled.img`
  height: 45px;
`;
