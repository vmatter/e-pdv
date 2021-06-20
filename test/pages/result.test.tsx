import React from 'react';
import ResultPage from '../../pages';
import { render } from '../testUtils';

jest.mock('next/router');

describe('Checkout', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<ResultPage />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
