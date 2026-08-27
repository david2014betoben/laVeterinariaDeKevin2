import { z } from "zod";

export const citaSchema = z.object({
  dueno_id: z.number().int().positive(),
  // BUG: mascota_id deberia ser numerico, no un string.
  mascota_id: z.string(),
  motivo: z.string().min(1, "El motivo es requerido"),
});

export const actualizarCitaSchema = citaSchema.partial();
