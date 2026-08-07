import { Request, Response } from 'express';

export const getUserPermissions = (req: Request, res: Response) => {
    // Logic to fetch user permissions based on JWT token
    const userId = req.user.id; // Assuming user ID is in the request
    // Fetch permissions from database or service
    res.json({ userId, role: 'user', permissions: ['checkin', 'checkout'] });
};