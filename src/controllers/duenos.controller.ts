import { Router } from "express";
import {
  obtenerDuenos,
  obtenerDuenoPorId,
  crearDueno,
  actualizarDueno,
  eliminarDueno,
} from "../models/duenos.model.js";
import { validate } from "../middlewares/validate.js";
import {
  duenoSchema,
  actualizarDuenoSchema,
} from "../schemas/duenos.schema.js";

export const duenosRouter = Router();

duenosRouter.get("/", async (req, res, next) => {
  try {
    // BUG: la funcion importada se llama "obtenerDuenos", no "obtenerDueno".
    const duenos = await obtenerDuenos();
    res.json(duenos);
  } catch (err) {
    next(err);
  }
});

duenosRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const dueno = await obtenerDuenoPorId(id);
    if (!dueno) {
      res.status(404).json({ error: "Dueno no encontrado" });
      return;
    }
    res.json(dueno);
  } catch (err) {
    next(err);
  }
});

duenosRouter.post("/", validate(duenoSchema), async (req, res, next) => {
  try {
    const nuevoDueno = await crearDueno(req.body);
    res.status(201).json(nuevoDueno);
  } catch (err) {
    next(err);
  }
});

duenosRouter.put(
  "/:id",
  validate(actualizarDuenoSchema),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const dueno = await actualizarDueno(id, req.body);
      if (!dueno) {
        res.status(404).json({ error: "Dueno no encontrado" });
        return;
      }
      res.json(dueno);
    } catch (err) {
      next(err);
    }
  },
);

duenosRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    // BUG: no se revisa si realmente se elimino algo, siempre responde OK.
    const eliminado = await eliminarDueno(id);
    if (!eliminado) {
      res.status(404).json({ error: "Dueno no encontrado" });
      return;
    }
    res.status(200).json({ message: "Dueno eliminado" });
  } catch (err) {
    next(err);
  }
});
