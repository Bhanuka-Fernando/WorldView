import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Profile from '../pages/Profile'; // Your component

test('renders correct greeting when name is passed', () => {
  render(
    <MemoryRouter> {/* Wrap the component with MemoryRouter */}
      <Profile name="John" />
    </MemoryRouter>
  );
  const heading = screen.getByText(/Hello, John/i);
  expect(heading).toBeInTheDocument();
});

test('renders default greeting when no name is passed', () => {
  render(
    <MemoryRouter> {/* Wrap the component with MemoryRouter */}
      <Profile />
    </MemoryRouter>
  );
  const heading = screen.getByText(/Hello, User/i);
  expect(heading).toBeInTheDocument();
});
