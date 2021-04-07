import React from 'react';
import LoginPage from '../../pages';
import { render, fireEvent } from '../testUtils';
import renderer from 'react-test-renderer';
import { screen, waitFor } from "@testing-library/react";
//import {useAuth} from '../../utils/auth';

jest.mock('next/router');
//jest.mock('../../utils/auth');

const expectedRouterPush = jest.fn();
const expectedLogin = jest.fn();
const expectedEmail = "admin";
const expectedPassword = "admin";

describe('Login', () => {

    //useRouter.mockReturnValue({push: expectedRouterPush});

  test('should redirect on sign in', async () => {
    const {getByText} = render(<LoginPage />);
    const email = getByText('usuário');
    const password = getByText('senha');
    const logInButton = getByText('Log In');

   
    fireEvent.change(email, {target: {value: expectedEmail}});
    fireEvent.change(password, {target: {value: expectedPassword}});
    fireEvent.click(logInButton);

    await waitFor(() => {

      expect(expectedLogin).toHaveBeenCalledTimes(1);
      expect(expectedLogin).toHaveBeenCalledWith('/login');

      expect(expectedRouterPush).toHaveBeenCalledTimes(1);
      expect(expectedRouterPush).toHaveBeenCalledWith('/login');

    })

  });

  test('should show toast error', async () => {
    expectedLogin.mockRejectedValue({
      message: 'Usuário ou senha não encontrados, tente novamente.'
    });

    const {getByText, getByLabelText} = render(<LoginPage />);
    const email = screen.getByLabelText('usuário');
    const password = getByLabelText('senha');
    const logInButton = getByText('Log In');


    fireEvent.change(email, {target: {value: 'foo'}});
    fireEvent.change(password, {target: {value: expectedPassword}});
    fireEvent.click(logInButton);

    await waitFor(() => {
      expect(expectedLogin).toHaveBeenCalledTimes(1);
      expect(expectedLogin).toHaveBeenCalledWith('foo', expectedPassword);

      const errorMessage = getByText('Usuário ou senha não encontrados, tente novamente.');

      expect(errorMessage).toBeVisible();
    });

  });

  test('should show erros for required fields', async () => {
    const wrapper = render(<LoginPage />);
    //const loginButton = wrapper.findByText('Log In');


    fireEvent.click(wrapper.getByTestId('button-login'));

    await waitFor(() => {

      const emailError = wrapper.getByText('Este campo deve ser preenchido.');

      expect(emailError).toBeVisible();

      expect(expectedLogin).not.toHaveBeenCalled();
      expect(expectedRouterPush).not.toHaveBeenCalled();
    })

  })

  it('matches snapshot', () => {
    const { asFragment } = render(<LoginPage />, {});
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<LoginPage></LoginPage>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
