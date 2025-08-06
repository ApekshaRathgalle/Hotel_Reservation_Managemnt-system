import { Request, Response } from 'express';
export declare const getHotels: (req: Request, res: Response) => Promise<void>;
export declare const getHotel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createHotel: (req: Request, res: Response) => Promise<void>;
export declare const updateHotel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteHotel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=hotel.controller.d.ts.map