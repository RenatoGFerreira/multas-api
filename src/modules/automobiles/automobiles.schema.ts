import { z } from "zod";

export const createAutomobileSchema = z.object({
  plate: z.string().min(6).max(8),
  brand: z.string().min(2),
  model: z.string().min(1),
  year: z.coerce.number().int().min(1900),
  color: z.string().min(3).optional(),
});

export type CreateAutomobileInput = z.infer<
  typeof createAutomobileSchema
>;