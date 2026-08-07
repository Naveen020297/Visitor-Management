import express from 'express';
const router = express.Router();

router.get('/api/v1/pages', (req, res) => {
    // Logic to get available pages
    res.json({ pages: [{ pageId: 'checkin', title: 'Check-in', route: '/checkin', icon: 'check-circle', description: 'Manage visitor check-in process' }] });
});

export default router;