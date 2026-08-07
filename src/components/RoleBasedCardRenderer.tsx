import React from 'react';
import CardGrid from './CardGrid';

const RoleBasedCardRenderer = ({ permissions }) => {
    const cards = [
        { id: 'checkin', title: 'Check-in', icon: 'check-circle', description: 'Manage visitor check-in', route: '/checkin', requiredPermission: 'checkin' },
        { id: 'checkout', title: 'Check-out', icon: 'check-circle', description: 'Manage visitor check-out', route: '/checkout', requiredPermission: 'checkout' },
        // Add more cards as needed
    ];

    const visibleCards = cards.filter(card => permissions.includes(card.requiredPermission));

    return <CardGrid cards={visibleCards} />;
};

export default RoleBasedCardRenderer;