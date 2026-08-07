import React from 'react';
import { render } from '@testing-library/react';
import RoleBasedCardRenderer from '../components/RoleBasedCardRenderer';

test('renders visible cards based on permissions', () => {
    const { getByText } = render(<RoleBasedCardRenderer permissions={['checkin']} />);
    expect(getByText(/Check-in/i)).toBeInTheDocument();
});