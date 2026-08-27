import { Router } from "express";
import {
  obtenerCitas,
  obtenerCitaPorId,
  obtenerCitasPorDueno,
  crearCita,
  actualizarCita,
  eliminarCita,
} from "../models/citas.model.js";
import { validate } from "../middlewares/validate.js";
import { citaSchema, actualizarCitaSchema } from "../schemas/citas.schema.js";

export const citasRouter = Router();

citasRouter.get("/", async (req, res, next) => {
  try {
    const citas = await obtenerCitas();
    res.json(citas);
  } catch (err) {
    next(err);
  }
});

// BUG: esta ruta esta antes que "/dueno/:duenoId", asi que Express
// hace match aqui primero y "dueno" termina tratado como si fuera un :id.
citasRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const cita = await obtenerCitaPorId(id);
    if (!cita) {
      res.status(404).json({ error: "Cita no encontrada" });
      return;
    }
    res.json(cita);
  } catch (err) {
    next(err);
  }
});

citasRouter.get("/dueno/:duenoId", async (req, res, next) => {
  try {
    const duenoId = Number(req.params.duenoId);
    const citas = await obtenerCitasPorDueno(duenoId);
    res.json(citas);
  } catch (err) {
    next(err);
  }
});

citasRouter.post("/", validate(citaSchema), async (req, res, next) => {
  try {
    const nuevaCita = await crearCita(req.body);
    res.status(201).json(nuevaCita);
  } catch (err) {
    next(err);
  }
});

citasRouter.put("/:id", validate(actualizarCitaSchema), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    // BUG: la funcion importada se llama "actualizarCita", no "actualizarCitas".
    const cita = await actualizarCitas(id, req.body);
    if (!cita) {
      res.status(404).json({ error: "Cita no encontrada" });
      return;
    }
    res.json(cita);
  } catch (err) {
    next(err);
  }
});

citasRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const eliminada = await eliminarCita(id);
    if (!eliminada) {
      res.status(404).json({ error: "Cita no encontrada" });
      return;
    }
    res.json({ message: "Cita eliminada" });
  } catch (err) {
    next(err);
  }
});
