import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
export declare const createBooking: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getUserBookings: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getAllBookings: (req: Request, res: Response) => Promise<void>;
export declare const getBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const cancelBooking: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=booking.controller.d.ts.map