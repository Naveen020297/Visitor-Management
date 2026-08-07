import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationCardProps {
    cardId: string;
    title: string;
    icon: string;
    description?: string;
    route: string;
}

const NavigationCard: React.FC<NavigationCardProps> = ({ cardId, title, icon, description, route }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route);
    };

    return (
        <div className="navigation-card" onClick={handleClick}>
            <i className={`icon-${icon}`}></i>
            <h3>{title}</h3>
            {description && <p>{description}</p>}
        </div>
    );
};

export default NavigationCard;