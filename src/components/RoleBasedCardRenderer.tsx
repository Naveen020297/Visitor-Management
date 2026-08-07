import React from 'react';
import { CardGrid } from './CardGrid';

const RoleBasedCardRenderer = ({ permissions }) => {
    const allCards = [
        { id: 'checkin', title: 'Check-in', icon: 'check-circle', description: 'Manage visitor check-in process', route: '/checkin', requiredPermission: 'checkin' },
        { id: 'checkout', title: 'Check-out', icon: 'check-circle', description: 'Manage visitor check-out process', route: '/checkout', requiredPermission: 'checkout' },
        { id: 'reports', title: 'Reports', icon: 'chart-bar', description: 'View visitor analytics and reports', route: '/reports', requiredPermission: 'reports' }
    ];

    const accessibleCards = allCards.filter(card => permissions.includes(card.requiredPermission));

    return <CardGrid cards={accessibleCards} />;
};

export default RoleBasedCardRenderer;