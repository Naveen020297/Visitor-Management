import { Router } from 'express';
import { getUserPermissions } from '../services/userService';

const router = Router();

router.get('/api/v1/user/permissions', async (req, res) => {
    try {
        const permissions = await getUserPermissions(req.user.id);
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;