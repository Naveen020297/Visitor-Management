import express from 'express';
const router = express.Router();

router.get('/api/v1/user/permissions', (req, res) => {
    // Logic to get user permissions
    res.json({ userId: req.user.id, permissions: ['checkin', 'checkout'] });
});

export default router;