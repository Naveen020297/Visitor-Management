import { Router } from 'express';
import { logDashboardEvent } from '../services/analyticsService';

const router = Router();

router.post('/api/v1/analytics/dashboard-event', async (req, res) => {
    try {
        const event = await logDashboardEvent(req.body);
        res.status(201).json({ success: true, eventId: event.id });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;