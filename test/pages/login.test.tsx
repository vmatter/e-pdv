import React from 'react';
import LoginForm from '../../components/LoginForm';
import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '../testUtils';

jest.mock('next/router');

describe('Login', () => {

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

    setTimeout(function(){
      expect(expectedLogin).toHaveBeenCalledTimes(1);
      expect(expectedLogin).toHaveBeenCalledWith('/login');

      expect(expectedRouterPush).toHaveBeenCalledTimes(1);
      expect(expectedRouterPush).toHaveBeenCalledWith('/login');
    }, 3000);
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

    
    setTimeout(function(){

      expect(expectedLogin).toHaveBeenCalledTimes(1);
      expect(expectedLogin).toHaveBeenCalledWith('foo', expectedPassword);
    
      const erroMessage = getByText('Usuário ou senha não encontrados, tente novamente.');

      expect(
        erroMessage
      ).toBeInTheDocument();
      
    }, 3000);

  });

  it('should show erros for required fields', async () => {
    const { getByTestId, getAllByText } = render(<LoginForm />);

    fireEvent.click(getByTestId('button-login'));

    await waitFor(() => {
      expect(
        getAllByText('Este campo deve ser preenchido.')[0]
      ).toBeInTheDocument();

      expect(expectedLogin).not.toHaveBeenCalled();
      expect(expectedRouterPush).not.toHaveBeenCalled();
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<LoginForm />, {});
    expect(asFragment()).toMatchSnapshot();
  });

});
