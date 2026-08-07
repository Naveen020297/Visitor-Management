import { Request, Response } from 'express';

const getUserPermissions = (req: Request, res: Response) => {
    // Logic to get user permissions from database or auth service
    res.json({ userId: req.user.id, role: req.user.role, permissions: ['checkin', 'checkout'], lastUpdated: new Date() });
};

export { getUserPermissions };