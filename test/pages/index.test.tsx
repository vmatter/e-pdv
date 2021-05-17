import React from 'react';
import IndexPage from '../../pages';
import { render } from '../testUtils';
import renderer from 'react-test-renderer';

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<IndexPage />, {});
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<IndexPage></IndexPage>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
