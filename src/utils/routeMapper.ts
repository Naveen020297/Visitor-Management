const RouteMapper = {
    mapCardToRoute(cardId) {
        const routes = {
            checkin: '/checkin',
            checkout: '/checkout',
            // Add more mappings as needed
        };
        return routes[cardId] || '/';
    }
};

export default RouteMapper;