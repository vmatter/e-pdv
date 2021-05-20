import Accounts from '../../components/Accounts';
import { render, fireEvent, waitFor } from '../testUtils';

describe('Accounts', () => {

  it('visible fields', async () => {
    const { getByTestId } = render(<Accounts />);

    expect(
      getByTestId('input-name')
    ).toBeInTheDocument();

    expect(
      getByTestId('select-type-person')
    ).toBeInTheDocument();

    expect(
      getByTestId('input-email')
    ).toBeInTheDocument();

    expect(
      getByTestId('input-password')
    ).toBeInTheDocument();


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
