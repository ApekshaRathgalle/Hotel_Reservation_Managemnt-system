import { Request, Response } from 'express';
export declare const getResorts: (req: Request, res: Response) => Promise<void>;
export declare const getResort: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createResort: (req: Request, res: Response) => Promise<void>;
export declare const updateResort: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteResort: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=resort.controller.d.ts.map