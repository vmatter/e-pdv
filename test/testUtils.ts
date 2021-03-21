import { render, RenderOptions } from '@testing-library/react';
import { ComponentType, ReactElement } from 'react';
import { ThemedApp } from '../styles';

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: ThemedApp as ComponentType, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
