import { Router } from "express";
import {
  obtenerEspecies,
  obtenerEspeciePorId,
  crearEspecie,
  actualizarEspecie,
  eliminarEspecie,
} from "../models/especies.model.js";
import { validate } from "../middlewares/validate.js";
import { especieSchema, actualizarEspecieSchema } from "../schemas/especies.schema.js";

export const especiesRouter = Router();

especiesRouter.get("/", async (req, res, next) => {
  try {
    const especies = await obtenerEspecies();
    res.json(especies);
  } catch (err) {
    next(err);
  }
});

especiesRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const especie = await obtenerEspeciePorId(id);
    if (!especie) {
      res.status(404).json({ error: "Especie no encontrada" });
      return;
    }
    res.json(especie);
  } catch (err) {
    next(err);
  }
});

especiesRouter.post("/", validate(especieSchema), async (req, res, next) => {
  try {
    // BUG: la funcion importada se llama "crearEspecie", no "crearEspecies".
    const nuevaEspecie = await crearEspecie(req.body);
    res.status(201).json(nuevaEspecie);
  } catch (err) {
    next(err);
  }
});

especiesRouter.put("/:id", validate(actualizarEspecieSchema), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const especie = await actualizarEspecie(id, req.body);
    if (!especie) {
      res.status(404).json({ error: "Especie no encontrada" });
      return;
    }
    res.json(especie);
  } catch (err) {
    next(err);
  }
});

especiesRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const eliminada = await eliminarEspecie(id);
    if (!eliminada) {
      res.status(404).json({ error: "Especie no encontrada" });
      return;
    }
    res.json({ message: "Especie eliminada" });
  } catch (err) {
    next(err);
  }
});
