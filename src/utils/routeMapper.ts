const routeMap = {
    checkin: '/checkin',
    checkout: '/checkout',
    reports: '/reports',
    visitors: '/visitors'
};

export const RouteMapper = {
    getRoute: (cardId) => routeMap[cardId] || '/'
};