import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Groups from './Groups';

describe('<Groups />', () => {
  test('it should mount', () => {
    render(<Groups />);
    
    const groups = screen.getByTestId('Groups');

    expect(groups).toBeInTheDocument();
  });
});