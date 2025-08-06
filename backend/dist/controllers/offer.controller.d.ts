import { Request, Response } from 'express';
export declare const getOffers: (req: Request, res: Response) => Promise<void>;
export declare const getAllOffers: (req: Request, res: Response) => Promise<void>;
export declare const getOffer: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createOffer: (req: Request, res: Response) => Promise<void>;
export declare const updateOffer: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteOffer: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=offer.controller.d.ts.map