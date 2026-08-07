import React from 'react';
import { render } from '@testing-library/react';
import DashboardPage from '../pages/DashboardPage';

test('renders dashboard page', () => {
    const { getByText } = render(<DashboardPage />);
    expect(getByText(/Dashboard/i)).toBeInTheDocument();
});