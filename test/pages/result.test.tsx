import React from 'react';
import ResultPage from '../../pages';
import { render } from '../testUtils';

describe('Checkout', () => {

  it('matches snapshot', () => {
    const { asFragment } = render(<ResultPage />, {});
    expect(asFragment()).toMatchSnapshot();
  });

});
