import React, { useEffect, useState } from 'react';
import { PermissionService } from '../services/permissionService';
import NavigationCard from '../components/NavigationCard';
import CardGrid from '../components/CardGrid';

const DashboardPage: React.FC = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const permissions = await PermissionService.fetchUserPermissions();
            // Assume fetchCards returns an array of card definitions based on permissions
            const availableCards = await fetchCards(permissions);
            setCards(availableCards);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <CardGrid cards={cards} />
    );
};

export default DashboardPage;