import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationCard = ({ cardId, title, icon, description, route }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route);
    };

    return (
        <div className="navigation-card" onClick={handleClick}>
            <i className={icon}></i>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default NavigationCard;