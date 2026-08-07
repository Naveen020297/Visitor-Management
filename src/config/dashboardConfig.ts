export const dashboardConfig = {
    cards: [
        { id: 'checkin', title: 'Check-in', icon: 'check-circle', description: 'Manage visitor check-in process', route: '/checkin', requiredPermission: 'checkin' },
        { id: 'checkout', title: 'Check-out', icon: 'check-out', description: 'Manage visitor check-out process', route: '/checkout', requiredPermission: 'checkout' },
        { id: 'reports', title: 'Reports', icon: 'chart-bar', description: 'View visitor reports', route: '/reports', requiredPermission: 'reports' }
    ]
};