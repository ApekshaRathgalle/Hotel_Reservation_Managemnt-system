import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { User } from '../models/user.model';

export interface AuthRequest extends Request {
  headers: any;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({ message: 'Invalid token.' });
      return;
    }

    req.user = {
      id: (user._id as string).toString(),
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};