import { Request, Response, NextFunction } from "express";

export const verifyRole = (allowedRoles: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
}
