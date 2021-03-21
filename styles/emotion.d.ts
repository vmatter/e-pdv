import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme  {
    colors: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
    };
  }
}