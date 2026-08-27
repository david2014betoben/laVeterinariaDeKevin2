import { z } from "zod";

export const mascotaSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  // BUG: falta impedir edad negativa (deberia tener .nonnegative()).
  edad: z.number().int().default(0),
  especie_id: z.number().int().positive("especie_id es requerido"),
});

export const actualizarMascotaSchema = mascotaSchema.partial();
