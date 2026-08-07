import { Router } from 'express';
import { getAvailablePages } from '../services/pageService';

const router = Router();

router.get('/api/v1/pages', async (req, res) => {
    try {
        const pages = await getAvailablePages();
        res.json({ pages });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;