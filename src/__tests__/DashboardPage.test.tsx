import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '../pages/DashboardPage';

test('renders loading state', () => {
    render(<DashboardPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
});