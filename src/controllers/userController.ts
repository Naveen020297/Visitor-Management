import express from 'express';
import { getUserPermissions } from '../services/userService';

const router = express.Router();

router.get('/api/v1/user/permissions', async (req, res) => {
    try {
        const permissions = await getUserPermissions(req.user.id);
        res.json({ userId: req.user.id, role: req.user.role, permissions });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch permissions' });
    }
});

export default router;