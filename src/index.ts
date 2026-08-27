import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./swagger.js";
import { especiesRouter } from "./controllers/especies.controller.js";
import { mascotasRouter } from "./controllers/mascotas.controller.js";
import { duenosRouter } from "./controllers/duenos.controller.js";
import { citasRouter } from "./controllers/citas.controller.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
// BUG: "jsonn" no existe en express, esto tumba el servidor al arrancar.
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/especies", especiesRouter);
app.use("/api/mascotas", mascotasRouter);
app.use("/api/duenos", duenosRouter);
app.use("/api/citas", citasRouter);

app.get("/", (req, res) => {
  res.json({ mensaje: "Bienvenido a la API de La Veterinaria de Kevin. Ve a /api-docs" });
});

app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentacion en http://localhost:${PORT}/api-docs`);
});