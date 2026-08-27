import { z } from "zod";

export const especieSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
});

export const actualizarEspecieSchema = especieSchema.partial();
