import { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    headers: any;
    user?: {
        id: string;
        email: string;
        role: string;
    };
}
export declare const authenticate: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map