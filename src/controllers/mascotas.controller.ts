import { Router } from "express";
import {
  obtenerMascotas,
  obtenerMascotaPorId,
  crearMascota,
  actualizarMascota,
  eliminarMascota,
} from "../models/mascotas.model.js";
import { validate } from "../middlewares/validate.js";
import { mascotaSchema, actualizarMascotaSchema } from "../schemas/mascotas.schema.js";

export const mascotasRouter = Router();

mascotasRouter.get("/", async (req, res, next) => {
  try {
    const mascotas = await obtenerMascotas();
    res.json(mascotas);
  } catch (err) {
    next(err);
  }
});

mascotasRouter.get("/:id", async (req, res, next) => {
  try {
    // BUG: el id llega por la URL (req.params), no por el body.
    const id = Number((req.params as any).id); //---->req.body cambia por req.params
    const mascota = await obtenerMascotaPorId(id);
    if (!mascota) {
      res.status(404).json({ error: "Mascota no encontrada" });
      return;
    }
    res.json(mascota);
  } catch (err) {
    next(err);
  }
});

mascotasRouter.post("/", validate(mascotaSchema), async (req, res, next) => {
  try {
    const nuevaMascota = await crearMascota(req.body);
    res.status(201).json(nuevaMascota);
  } catch (err) {
    next(err);
  }
});

mascotasRouter.put("/:id", validate(actualizarMascotaSchema), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    // BUG: la funcion importada se llama "actualizarMascota", no "actualizarMascotas".
    const mascota = await actualizarMascota(id, req.body);
    if (!mascota) {
      res.status(404).json({ error: "Mascota no encontrada" });
      return;
    }
    res.json(mascota);
  } catch (err) {
    next(err);
  }
});

mascotasRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const eliminada = await eliminarMascota(id);
    if (!eliminada) {
      res.status(404).json({ error: "Mascota no encontrada" });
      return;
    }
    res.json({ message: "Mascota eliminada" });
  } catch (err) {
    next(err);
  }
});
