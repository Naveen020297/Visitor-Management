const RouteMapper = {
    mapCardToRoute(cardId) {
        const routes = {
            checkin: '/checkin',
            checkout: '/checkout',
            reports: '/reports'
        };
        return routes[cardId];
    }
};

export default RouteMapper;