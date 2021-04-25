import React from 'react';
import { render } from '../testUtils';
import LoginForm from '../../components/LoginForm';

describe('LoginForm', () => {

    it('matches snapshot', () => {
        const { asFragment } = render(<LoginForm />, {});
        expect(asFragment()).toMatchSnapshot();
    });

});
