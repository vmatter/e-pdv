import React from 'react';
import IndexPage from '../../pages';
import { render } from '../testUtils';
import renderer from 'react-test-renderer';

describe('Home page', () => {

  /*test('Products list', async () => {
   
    const {getByText} = render(<IndexPage />);
    const cartSummary = getByText('Cart Summary');


    expect(cartSummary).toBeVisible();

  });*/

  it('matches snapshot', () => {
    const { asFragment } = render(<IndexPage />, {});
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<IndexPage></IndexPage>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
