import { render } from '../testUtils';
import HeaderBar from '../../components/HeaderBar';

describe('HeaderBar', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<HeaderBar />, {});
    expect(asFragment()).toMatchSnapshot();
  });

  test('User account', async () => {
    const { getByText } = render(<HeaderBar />);

    expect(getByText('Usuários')).toBeInTheDocument();

    expect(getByText('Produtos')).toBeInTheDocument();

    expect(getByText('Sair')).toBeInTheDocument();
  });
});
