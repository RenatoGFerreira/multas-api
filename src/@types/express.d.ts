import "express";

declare global {
  namespace Express {
    interface Request {
      validatedQuery?: {
        page: number;
        limit: number;
      };
    }
  }
}
declare module "express-serve-static-core" {
  interface Request {
    validatedBody?: any;
    validatedQuery?: any;
  }
}


export {};