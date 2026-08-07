import React from 'react';
import NavigationCard from './NavigationCard';

interface CardGridProps {
    cards: Array<{ cardId: string; title: string; icon: string; description?: string; route: string; }>; 
}

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
    return (
        <div className="card-grid">
            {cards.map(card => (
                <NavigationCard key={card.cardId} {...card} />
            ))}
        </div>
    );
};

export default CardGrid;