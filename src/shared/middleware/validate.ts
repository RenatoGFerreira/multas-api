import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export function validateQuery<T>(schema: ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid query parameters",
        errors: result.error.flatten().fieldErrors,
      });
    }

    req.validatedQuery = result.data;
    next();
  };
}

export function validateBody<T>(schema: ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request body",
        errors: result.error.flatten().fieldErrors,
      });
    }

    req.validatedBody = result.data;
    next();
  };
}
