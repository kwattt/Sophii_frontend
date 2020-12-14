import { render, screen } from '@testing-library/react';
import App from './App';

test('test_app', () => {
  render(<App />);
  const linkElement = screen.getByText(/WIP/i);
  expect(linkElement).toBeInTheDocument();
});
