import { pool } from "../config/db.js";

export interface Especie {
  id: number;
  nombre: string;
  descripcion: string | null;
}

export const obtenerEspecies = async (): Promise<Especie[]> => {
  // BUG: la tabla se llama "especies", no "especie".
  const result = await pool.query("SELECT * FROM especie ORDER BY id");
  return result.rows;
};

export const obtenerEspeciePorId = async (id: number): Promise<Especie | undefined> => {
  const result = await pool.query("SELECT * FROM especies WHERE id = $1", [id]);
  return result.rows[0];
};

export const crearEspecie = async (data: { nombre: string; descripcion?: string }): Promise<Especie> => {
  const result = await pool.query(
    "INSERT INTO especies (nombre, descripcion) VALUES ($1, $2) RETURNING *",
    [data.nombre, data.descripcion ?? null]
  );
  return result.rows[0];
};

export const actualizarEspecie = async (
  id: number,
  data: { nombre?: string; descripcion?: string }
): Promise<Especie | undefined> => {
  const actual = await obtenerEspeciePorId(id);
  if (!actual) return undefined;

  const nombre = data.nombre ?? actual.nombre;
  const descripcion = data.descripcion ?? actual.descripcion;

  // BUG: los valores se mandan en un orden distinto al de los placeholders,
  // asi que nombre y descripcion terminan intercambiados en la base de datos.
  const result = await pool.query(
    "UPDATE especies SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *",
    [descripcion, nombre, id]
  );
  return result.rows[0];
};

export const eliminarEspecie = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM especies WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};
