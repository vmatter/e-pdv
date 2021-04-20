import React from 'react';
import { render } from '../testUtils';
import HeaderBar from '../../components/HeaderBar';
import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

describe('HeaderBar', () => {

    it('matches snapshot', () => {
        const { asFragment } = render(<HeaderBar />, {});
        expect(asFragment()).toMatchSnapshot();
    });

    test('User account', async () => {
        const { getByText } = render(<HeaderBar />);

        expect(
            getByText('Perfil')
            ).toBeInTheDocument();

        expect(
            getByText('Minha conta')
            ).toBeInTheDocument();
    });

});
