import React, { FunctionComponent } from 'react';
import { ThemeProvider } from '@emotion/react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { ThemeProps } from './types';

import MuiTheme from './theme/material-ui-theme';
import { emotionTheme } from './theme/emotion-theme';
import { globalStyles } from './global';

export const withMaterialUITheme = (wrappedComponent: any) => (
  <MuiThemeProvider theme={MuiTheme}>{wrappedComponent}</MuiThemeProvider>
);

export const withStyledComponentTheme = (wrappedComponent: any) => (
  <ThemeProvider theme={emotionTheme}>{wrappedComponent}</ThemeProvider>
);

export const ThemedApp: FunctionComponent<ThemeProps> = ({ children }) => (
  <MuiThemeProvider theme={MuiTheme}>
    <ThemeProvider theme={emotionTheme}>
      <>
        {globalStyles}
        {children}
      </>
    </ThemeProvider>
  </MuiThemeProvider>
);
