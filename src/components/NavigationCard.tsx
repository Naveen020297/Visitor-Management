import React from 'react';

const NavigationCard = ({ cardId, title, icon, description, route, onClick }) => {
    return (
        <div className="navigation-card" onClick={() => onClick(route)}>
            <i className={icon}></i>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default NavigationCard;