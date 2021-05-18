import IndexPage from '../../pages';
import { render, waitFor } from '../testUtils';

describe('Home page', () => {
  test('Products list', async () => {
    const { getByText } = render(<IndexPage />);

    waitFor(() => {
      expect(getByText('Resumo do Carrinho')).toBeInTheDocument();

      expect(getByText('Total de Itens:')).toBeInTheDocument();

      expect(getByText('Valor Total:')).toBeInTheDocument();

      expect(getByText('Finalizar Compra')).toBeInTheDocument();

      expect(getByText('Limpar Carrinho')).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<IndexPage />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
