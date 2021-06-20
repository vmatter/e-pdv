import Users from '../../components/Users';
import { render, fireEvent, waitFor } from '../testUtils';

jest.mock('next/router');

describe('Users', () => {
  const expectedRegister = jest.fn();
  const expectedTypePerson = 'admin';
  const expectedName = 'Vítor';
  const expectedEmail = 'vitor@admin.com';
  const expectedPassword = 'admin';

  it('visible fields', async () => {
    const { getByTestId, getAllByText } = render(<Users />);

    expect(getAllByText('Gerenciar usuários')[0]).toBeInTheDocument();

    expect(
      getAllByText(
        'Crie usuários do tipo Administrador ou Operador de Caixa'
      )[0]
    ).toBeInTheDocument();

    expect(getByTestId('input-name')).toBeInTheDocument();

    expect(getByTestId('select-type-person')).toBeInTheDocument();

    expect(getByTestId('input-email')).toBeInTheDocument();

    expect(getByTestId('input-password')).toBeInTheDocument();
  });

  it('should show erros for required fields', () => {
    const { getByTestId, getAllByText } = render(<Users />);

    fireEvent.click(getByTestId('button-save'));

    waitFor(() => {
      expect(
        getAllByText('Este campo deve ser preenchido.')[0]
      ).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { container } = render(<Users />, {});
    expect(container.firstChild).toMatchSnapshot();
  });

  it('expected form informations', () => {
    const { getByTestId } = render(<Users />);

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
