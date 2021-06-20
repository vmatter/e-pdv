import React from 'react';
import { render } from '../testUtils';
import ClearCart from '../../components/ClearCart';

describe('ClearCart', () => {
  it('matches snapshot', () => {
    const { container } = render(<ClearCart />, {});
    expect(container.firstChild).toMatchSnapshot();
  });
});
