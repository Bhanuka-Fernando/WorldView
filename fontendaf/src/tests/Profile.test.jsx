import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../pages/Profile';

test('renders Profile page heading', () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  const heading = screen.getByText(/My Profile/i);
  expect(heading).toBeInTheDocument();
});
