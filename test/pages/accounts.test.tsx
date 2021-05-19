import Accounts from '../../components/Accounts';
import { render, fireEvent, waitFor } from '../testUtils';

describe('Accounts', () => {

  const expectedFisica      = 'fisica';
  const expectedJuridica    = 'juridica';
  const expectedEstrangeiro = 'estrangeiro';

  it('change type person', () => {
    const { getByTestId, getByText } = render(<Accounts />);

    fireEvent.change(getByTestId('select-type-person'), {
      target: { value: expectedFisica },
    });

    waitFor(() => {
      expect(
        getByText('CPF')
      ).toBeVisible();
    });

    fireEvent.change(getByTestId('select-type-person'), {
      target: { value: expectedJuridica },
    });

    waitFor(() => {
      expect(
        getByText('CNPJ')
      ).toBeVisible();
      expect(
        getByText('Razão Social')
      ).toBeVisible();
      expect(
        getByText('Nome Fantasia')
      ).toBeVisible();
    });

    fireEvent.change(getByTestId('select-type-person'), {
      target: { value: expectedEstrangeiro },
    });

    waitFor(() => {
      expect(
        getByText('Nº Passaporte')
      ).toBeVisible();
    });

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

});
