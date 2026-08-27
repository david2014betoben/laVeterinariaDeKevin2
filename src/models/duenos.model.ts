import { pool } from "../config/db.js";

export interface Dueno {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
}

export const obtenerDuenos = async (): Promise<Dueno[]> => {
  const result = await pool.query("SELECT * FROM duenos ORDER BY id");
  return result.rows;
};

export const obtenerDuenoPorId = async (id: number): Promise<Dueno | undefined> => {
  const result = await pool.query("SELECT * FROM duenos WHERE id = $1", [id]);
  return result.rows[0];
};

export const crearDueno = async (data: {
  nombre: string;
  email: string;
  telefono?: string;
}): Promise<Dueno> => {
  // BUG: la columna "telefono" no esta en el INSERT, asi que aunque el
  // dueno la mande siempre se guarda como null.
  const result = await pool.query(
    "INSERT INTO duenos (nombre, email) VALUES ($1, $2) RETURNING *",
    [data.nombre, data.email, data.telefono ?? null]
  );
  return result.rows[0];
};

export const actualizarDueno = async (
  id: number,
  data: Partial<{ nombre: string; email: string; telefono: string }>
): Promise<Dueno | undefined> => {
  const actual = await obtenerDuenoPorId(id);
  if (!actual) return undefined;

  const nombre = data.nombre ?? actual.nombre;
  const email = data.email ?? actual.email;
  const telefono = data.telefono ?? actual.telefono;

  const result = await pool.query(
    "UPDATE duenos SET nombre = $1, email = $2, telefono = $3 WHERE id = $4 RETURNING *",
    [nombre, email, telefono, id]
  );
  return result.rows[0];
};

export const eliminarDueno = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM duenos WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};
