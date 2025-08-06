import { Request, Response } from 'express';
export declare const getWeddingHalls: (req: Request, res: Response) => Promise<void>;
export declare const getWeddingHall: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createWeddingHall: (req: Request, res: Response) => Promise<void>;
export declare const updateWeddingHall: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteWeddingHall: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=wedding.controller.d.ts.map