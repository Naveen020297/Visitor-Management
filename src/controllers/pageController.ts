import { Request, Response } from 'express';

export const getPages = (req: Request, res: Response) => {
    // Logic to fetch available pages for dashboard
    const pages = [
        { pageId: 'checkin', title: 'Check-in', route: '/checkin', icon: 'check-circle', description: 'Manage visitor check-in process' },
        { pageId: 'checkout', title: 'Check-out', route: '/checkout', icon: 'check-out', description: 'Manage visitor check-out process' }
    ];
    res.json({ pages });
};