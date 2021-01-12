import { render, screen } from '@testing-library/react';
import React from 'react';
import Light from './Light';

describe('<Light />', () => {
  test('it should mount', () => {
    render(<Light id="1"/>);
    
    const light = screen.getByTestId('Light');

    expect(light).toBeInTheDocument();
  });
});