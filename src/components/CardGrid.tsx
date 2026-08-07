import React from 'react';
import NavigationCard from './NavigationCard';

const CardGrid = ({ cards, onCardClick }) => {
    return (
        <div className="card-grid">
            {cards.map(card => (
                <NavigationCard key={card.id} {...card} onClick={onCardClick} />
            ))}
        </div>
    );
};

export default CardGrid;