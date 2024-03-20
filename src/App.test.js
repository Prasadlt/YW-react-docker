import { render, screen } from '@testing-library/react';
// import App from './App';
import Header from './component/header/Header';
import Home from './component/Home';
test('renders welcome', () => {
  render(<Home />);
  const linkElement = screen.getByText('Hi you! Welcome to Yorkshire');
  expect(linkElement).toBeInTheDocument();
});

