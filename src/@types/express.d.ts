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

export {};