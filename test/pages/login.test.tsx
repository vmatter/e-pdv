import React from 'react';
import LoginForm from '../../components/LoginForm';
import { render, fireEvent, waitFor } from '../testUtils';
import renderer from 'react-test-renderer';

jest.mock('next/router');

describe('Login', () => {

  it('matches snapshot', () => {
    const { asFragment } = render(<LoginForm />, {});
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<LoginForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
