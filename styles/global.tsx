import { css, Global } from '@emotion/react';

const globalCss = css(`
* {
  box-sizing: border-box;
  font-family: var(--body-font-family);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: ${(props: any) => props.theme.colors.background};
  color: ${(props: any) => props.theme.colors.text};
  overflow-y: scroll;
  }

  a {
  text-decoration: none;
  }

  #__next {
  display: flex;
  justify-content: center;
  }
`);

export const globalStyles = <Global styles={globalCss} />;
