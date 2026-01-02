import { z } from "zod";

export const createAutomobileSchema = z.object({
  plate: z.string().min(6).max(8),
  brand: z.string().min(2),
  model: z.string().min(1),
  year: z.coerce.number().int().min(1900),
  color: z.string().min(3).optional(),
});
export type CreateAutomobileInput = z.infer<typeof createAutomobileSchema>;

export const listAutomobileQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});
export type ListAutomobileQuery = z.infer<typeof listAutomobileQuerySchema>;

export const getAutomobilePlateSchema = z.object({
  plate: z.string().min(6).max(8),
});
export type GetAutomobilePlateInput = z.infer<typeof getAutomobilePlateSchema>;

export const getAutomobileIdSchema = z.object({
  id: z.string().uuid(),
})
export type GetAutomobileIdInput = z.infer<typeof getAutomobileIdSchema>;

export const deactivateAutomobileSchema = z.object({
  id: z.string().uuid(),
});
export type DeactivateAutomobileInput = z.infer<
  typeof deactivateAutomobileSchema
>;