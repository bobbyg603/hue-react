import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Light from './Light';

describe('<Light />', () => {
  test('it should mount', () => {
    render(<Light />);
    
    const light = screen.getByTestId('Light');

    expect(light).toBeInTheDocument();
  });
});