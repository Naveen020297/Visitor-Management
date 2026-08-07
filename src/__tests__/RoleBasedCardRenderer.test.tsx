import React from 'react';
import { render } from '@testing-library/react';
import RoleBasedCardRenderer from '../components/RoleBasedCardRenderer';

test('renders RoleBasedCardRenderer with visible cards', () => {
    const permissions = ['checkin'];
    render(<RoleBasedCardRenderer permissions={permissions} />);
    expect(screen.getByText(/Check-in/i)).toBeInTheDocument();
});