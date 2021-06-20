import React from 'react';
import ResultPage from '../../pages';
import { render } from '../testUtils';

jest.mock('next/router');

describe('Checkout', () => {
  it('matches snapshot', () => {
    const { container } = render(<ResultPage />, {});
    expect(container.firstChild).toMatchSnapshot();
  });
});
