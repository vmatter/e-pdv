import { render } from '../testUtils';
import HeaderBar from '../../components/HeaderBar';

describe('HeaderBar', () => {
  it('matches snapshot', () => {
    const { container } = render(<HeaderBar />, {});
    expect(container.firstChild).toMatchSnapshot();
  });

  test('User account', async () => {
    const { getByText } = render(<HeaderBar />);

    expect(getByText('Usuários')).toBeInTheDocument();

    expect(getByText('Produtos')).toBeInTheDocument();

    expect(getByText('Sair')).toBeInTheDocument();
  });
});
