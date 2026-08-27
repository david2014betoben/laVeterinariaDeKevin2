import { z } from "zod";

export const mascotaSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es requerido"), //agregamos .trim para que no esté vaci
  // BUG: falta impedir edad negativa (deberia tener .nonnegative()).
  edad: z.number().int().min(0,"la edad no puede ser negativa").default(0), 
  especie_id: z.number().int().positive("especie_id es requerido"),
});

export const actualizarMascotaSchema = mascotaSchema.partial();
