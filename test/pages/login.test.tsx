import React from 'react';
import LoginForm from '../../components/LoginForm';
import { render, fireEvent, waitFor } from '../testUtils';
import renderer from 'react-test-renderer';

jest.mock('next/router');

describe('Login', () => {
  //useRouter.mockReturnValue({push: expectedRouterPush});

  const expectedRouterPush = jest.fn();
  const expectedLogin = jest.fn();
  const expectedEmail = 'admin';
  const expectedPassword = 'admin';

  it('should redirect on sign in', async () => {
    const { getByTestId } = render(<LoginForm />);

    fireEvent.change(getByTestId('input-user'), {
      target: { value: expectedEmail },
    });
    fireEvent.change(getByTestId('input-password'), {
      target: { value: expectedPassword },
    });
    fireEvent.click(getByTestId('button-login'));

    await waitFor(() => {
      expect(expectedLogin).toHaveBeenCalledTimes(1);
      expect(expectedLogin).toHaveBeenCalledWith('/login');

      expect(expectedRouterPush).toHaveBeenCalledTimes(1);
      expect(expectedRouterPush).toHaveBeenCalledWith('/login');
    });
  });

  it('should show toast error', async () => {
    expectedLogin.mockRejectedValue({
      message: 'Usuário ou senha não encontrados, tente novamente.',
    });

    const { getByTestId, getByText } = render(<LoginForm />);
    fireEvent.change(getByTestId('input-user'), {
      target: { value: 'foo' },
    });
    fireEvent.change(getByTestId('input-password'), {
      target: { value: expectedPassword },
    });
    fireEvent.click(getByTestId('button-login'));

    await waitFor(() => {
      expect(expectedLogin).toHaveBeenCalledTimes(1);
      expect(expectedLogin).toHaveBeenCalledWith('foo', expectedPassword);

      const errorMessage = getByText(
        'Usuário ou senha não encontrados, tente novamente.'
      );

      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should show erros for required fields', async () => {
    const { getByTestId, getAllByText } = render(<LoginForm />);

    fireEvent.click(getByTestId('button-login'));

    await waitFor(() => {
      expect(
        getAllByText('Este campo deve ser preenchido.')
      ).toBeInTheDocument();

      expect(expectedLogin).not.toHaveBeenCalled();
      expect(expectedRouterPush).not.toHaveBeenCalled();
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<LoginForm />, {});
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<LoginForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
