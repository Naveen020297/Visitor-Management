import React from 'react';
import NavigationCard from './NavigationCard';

const CardGrid = ({ cards }) => {
    return (
        <div className='card-grid'>
            {cards.map(card => (
                <NavigationCard key={card.id} {...card} />
            ))}
        </div>
    );
};

export default CardGrid;