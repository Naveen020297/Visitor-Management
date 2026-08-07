import React from 'react';

const NavigationCard = ({ title, icon, description, route, onClick }) => {
    return (
        <div className="navigation-card" onClick={onClick}>
            <i className={`icon-${icon}`}></i>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default NavigationCard;