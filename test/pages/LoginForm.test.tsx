import React from 'react';
import { render } from '../testUtils';
import LoginForm from '../../components/LoginForm';

jest.mock('next/router');

describe('LoginForm', () => {
  it('matches snapshot', () => {
    const { container } = render(<LoginForm />, {});
    expect(container.firstChild).toMatchSnapshot();
  });
});
