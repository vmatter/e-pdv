import Accounts from '../../components/Accounts';
import { render, fireEvent, waitFor } from '../testUtils';

describe('Accounts', () => {
  const expectedRegister = jest.fn();
  const expectedTypePerson = 'admin';
  const expectedName = 'Vítor';
  const expectedEmail = 'vitor@admin.com';
  const expectedPassword = 'admin';

  it('visible fields', async () => {
    const { getByTestId, getAllByText } = render(<Accounts />);

    expect(getAllByText('Gerenciar usuários')[0]).toBeInTheDocument();

    expect(getAllByText('Crie usuários do tipo Administrador ou Operador de Caixa')[0]).toBeInTheDocument();

    expect(getByTestId('input-name')).toBeInTheDocument();

    expect(getByTestId('select-type-person')).toBeInTheDocument();

    expect(getByTestId('input-email')).toBeInTheDocument();

    expect(getByTestId('input-password')).toBeInTheDocument();
  });

  it('should show erros for required fields', async () => {
    const { getByTestId, getAllByText } = render(<Accounts />);

    fireEvent.click(getByTestId('button-save'));

    await waitFor(() => {
      expect(
        getAllByText('Este campo deve ser preenchido.')[0]
      ).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Accounts />, {});
    expect(asFragment()).toMatchSnapshot();
  });

  it('expected form informations', () => {
    const { getByTestId } = render(<Accounts />);

    fireEvent.change(getByTestId('select-type-person'), {
      target: { value: expectedTypePerson },
    });

    fireEvent.change(getByTestId('input-name'), {
      target: { value: expectedName },
    });

    fireEvent.change(getByTestId('input-email'), {
      target: { value: expectedEmail },
    });

    fireEvent.change(getByTestId('input-password'), {
      target: { value: expectedPassword },
    });

    fireEvent.click(getByTestId('button-save'));

    waitFor(() => {
      expect(expectedRegister).toHaveBeenCalledTimes(1);
      expect(expectedRegister).toHaveBeenCalledWith('/account');
    });
  });
});
