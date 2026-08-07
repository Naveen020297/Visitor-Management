import React from 'react';
import CardGrid from './CardGrid';
import { dashboardConfig } from '../config/dashboardConfig';

const RoleBasedCardRenderer = ({ permissions }) => {
    const availableCards = dashboardConfig.cards.filter(card => 
        permissions.includes(card.requiredPermission)
    );

    return <CardGrid cards={availableCards} onCardClick={(route) => { /* navigate to route */ }} />;
};

export default RoleBasedCardRenderer;