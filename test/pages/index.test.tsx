import React from 'react';
import IndexPage from '../../pages';
import { render } from '../testUtils';
import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

describe('Home page', () => {

  test('Products list', async () => {
   
    const {getByText} = render(<IndexPage />);

    expect(
      getByText('Resumo do Carrinho')
      ).toBeInTheDocument();

    expect(
      getByText('Total de Itens:')
      ).toBeInTheDocument();

    expect(
      getByText('Valor Total:')
      ).toBeInTheDocument();

    expect(
      getByText('Finalizar Compra')
      ).toBeInTheDocument();

    expect(
      getByText('Limpar Carrinho')
      ).toBeInTheDocument();

  });

  it('matches snapshot', () => {
    const { asFragment } = render(<IndexPage />, {});
    expect(asFragment()).toMatchSnapshot();
  });

});
