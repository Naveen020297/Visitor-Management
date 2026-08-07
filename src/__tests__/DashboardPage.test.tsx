import React from 'react';
import { render } from '@testing-library/react';
import DashboardPage from '../pages/DashboardPage';

test('renders DashboardPage', () => {
    render(<DashboardPage />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});