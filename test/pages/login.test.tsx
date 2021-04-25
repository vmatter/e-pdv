import LoginForm from '../../components/LoginForm';
import { render, fireEvent, waitFor } from '../testUtils';

jest.mock('next/router');

describe('LoginForm', () => {

  const expectedRouterPush = jest.fn();
  const expectedLogin = jest.fn();
  const expectedEmail = 'admin';
  const expectedPassword = 'admin';

  it('should redirect on sign in', () => {
    const { getByTestId } = render(<LoginForm />);

    fireEvent.change(getByTestId('input-user'), {
      target: { value: expectedEmail },
    });
    fireEvent.change(getByTestId('input-password'), {
      target: { value: expectedPassword },
    });
    fireEvent.click(getByTestId('button-login'));

    waitFor(() => {
      expect(expectedLogin).toHaveBeenCalledTimes(1);
      expect(expectedLogin).toHaveBeenCalledWith('/login');

      expect(expectedRouterPush).toHaveBeenCalledTimes(1);
      expect(expectedRouterPush).toHaveBeenCalledWith('/login');
    });
  }); 

  it('should show toast error', () => {
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

    
    waitFor(() => {

      expect(expectedLogin).toHaveBeenCalledTimes(1);
      expect(expectedLogin).toHaveBeenCalledWith('foo', expectedPassword);
    
      const erroMessage = getByText('Usuário ou senha não encontrados, tente novamente.');

      expect(
        erroMessage
      ).toBeInTheDocument();
      
    });

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
