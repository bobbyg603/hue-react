import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Room from './Room';

describe('<Room />', () => {
  test('it should mount', () => {
    render(<Room id="1"/>);
    
    const group = screen.getByTestId('Room');

    expect(group).toBeInTheDocument();
  });
});