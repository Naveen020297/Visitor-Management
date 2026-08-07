import express from 'express';

const router = express.Router();

router.get('/api/v1/pages', (req, res) => {
    const pages = [
        { pageId: 'checkin', title: 'Check-in', route: '/checkin', icon: 'check-circle', description: 'Manage visitor check-in process' },
        { pageId: 'checkout', title: 'Check-out', route: '/checkout', icon: 'check-circle', description: 'Manage visitor check-out process' },
        { pageId: 'reports', title: 'Reports', route: '/reports', icon: 'chart-bar', description: 'View visitor analytics and reports' }
    ];
    res.json({ pages });
});

export default router;