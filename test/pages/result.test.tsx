import React from 'react';
import ResultPage from '../../pages';
import { render } from '../testUtils';
import renderer from 'react-test-renderer';

describe('Checkout', () => {

  it('matches snapshot', () => {
    const { asFragment } = render(<ResultPage />, {});
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<ResultPage></ResultPage>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
