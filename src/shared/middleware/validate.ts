import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

type PaginationQuery = {
  page: number;
  limit: number;
};

export function validateQuery(schema: ZodType<PaginationQuery>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    console.log(req.query)
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
