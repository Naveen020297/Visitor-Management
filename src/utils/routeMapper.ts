const RouteMapper = {
    mapCardIdToRoute: (cardId) => {
        const routes = {
            checkin: '/checkin',
            checkout: '/checkout',
            reports: '/reports'
        };
        return routes[cardId];
    }
};

export { RouteMapper };