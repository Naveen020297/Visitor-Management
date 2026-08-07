import React from 'react';
import { render } from '@testing-library/react';
import RoleBasedCardRenderer from '../components/RoleBasedCardRenderer';

test('renders only visible cards based on permissions', () => {
    const cards = [
        { cardId: 'checkin', title: 'Check-in', icon: 'check-circle', route: '/checkin' },
        { cardId: 'checkout', title: 'Check-out', icon: 'check-out', route: '/checkout' }
    ];
    const permissions = ['checkin'];
    const { container } = render(<RoleBasedCardRenderer cards={cards} permissions={permissions} />);
    expect(container.getElementsByClassName('navigation-card').length).toBe(1);
});