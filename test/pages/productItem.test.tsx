import React from 'react';
import { render } from '../testUtils';
import '@testing-library/jest-dom';
import ProductItem from '../../components/ProductItem';

jest.mock('next/router');

const expectedProps = {
  name: 'Notebook Dell XPS',
  sku: 'sku_notebook',
  price: 540000,
  images: [
    'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  ],
  quantity: 20,
  id: '0',
};

describe('ProductItem', () => {
  test('should render name, and imagem', async () => {
    const { getByText } = render(<ProductItem product={expectedProps} />);
    const name = getByText(expectedProps.name);

    expect(name).toBeVisible();
  });

  test('matches snapshot', () => {
    const { container } = render(<ProductItem product={expectedProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
