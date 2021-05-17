import React from 'react';
import { render } from '../testUtils';
import '@testing-library/jest-dom';
import ProductItem from '../../components/ProductItem';

describe('Index Page', () => {
  const expectedProps = {
    name: 'Notebook Dell XPS',
    description: 'Notebook Dell XPS',
    sku: 'sku_notebook',
    price: 540000,
    image:
      'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    currency: 'BRL',
  };

  test('should render name, and imagem', async () => {
    const { getByText } = render(<ProductItem product={expectedProps} />);
    const name = getByText(expectedProps.name);

    expect(name).toBeVisible();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<ProductItem product={expectedProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
