import { z } from "zod";

export const duenoSchema = z.object({
  nombre: z
    .string({ message: "El nombre debe ser obligatorio" })
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  // BUG: falta validar que el email realmente tenga formato de email.
  email: z
    .string({ error: "El email debe ser obligatorio" })
    .trim()
    .min(1, "El email no puede estar vacío")
    .max(150, "El email no puede superar los 150 caracteres")
    .email("El email debe tener un formato válido"),

  telefono: z
    .string()
    .regex(
      /^\+?[0-9]{1,20}$/,
      "El teléfono debe ser solo números enteros y opcional con el signo +",
    )
    .max(20, "Solo puede haber 20 numeros maximo")
    .min(1, "Solo puede haber minimo un numero")
    .optional(),
});
export const actualizarDuenoSchema = duenoSchema.partial();
