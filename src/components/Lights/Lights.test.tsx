import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Lights from './Lights';

describe('<Lights />', () => {
  test('it should mount', () => {
    render(<Lights />);
    
    const lights = screen.getByTestId('Lights');

    expect(lights).toBeInTheDocument();
  });
});