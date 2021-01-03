import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title \'Hue\'', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hue/i);
  expect(linkElement).toBeInTheDocument();
});
