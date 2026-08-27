import { pool } from "../config/db.js";

export interface Cita {
  id: number;
  dueno_id: number;
  mascota_id: number;
  motivo: string;
  fecha: string;
}

export const obtenerCitas = async (): Promise<Cita[]> => {
  const result = await pool.query("SELECT * FROM citas ORDER BY id");
  return result.rows;
};

export const obtenerCitaPorId = async (id: number): Promise<Cita | undefined> => {
  const result = await pool.query("SELECT * FROM citas WHERE id = $1", [id]);
  return result.rows[0];
};

export const obtenerCitasPorDueno = async (duenoId: number): Promise<Cita[]> => {
  const result = await pool.query("SELECT * FROM citas WHERE dueno_id = $1 ORDER BY id", [duenoId]);
  return result.rows;
};

export const crearCita = async (data: {
  dueno_id: number;
  mascota_id: number;
  motivo: string;
}): Promise<Cita> => {
  // BUG: el metodo se llama "query", no "qeury".
  const result = await pool.qeury(
    "INSERT INTO citas (dueno_id, mascota_id, motivo) VALUES ($1, $2, $3) RETURNING *",
    [data.dueno_id, data.mascota_id, data.motivo]
  );
  return result.rows[0];
};

export const actualizarCita = async (
  id: number,
  data: Partial<{ dueno_id: number; mascota_id: number; motivo: string }>
): Promise<Cita | undefined> => {
  const actual = await obtenerCitaPorId(id);
  if (!actual) return undefined;

  const dueno_id = data.dueno_id ?? actual.dueno_id;
  const mascota_id = data.mascota_id ?? actual.mascota_id;
  const motivo = data.motivo ?? actual.motivo;

  const result = await pool.query(
    "UPDATE citas SET dueno_id = $1, mascota_id = $2, motivo = $3 WHERE id = $4 RETURNING *",
    [dueno_id, mascota_id, motivo, id]
  );
  return result.rows[0];
};

export const eliminarCita = async (id: number): Promise<boolean> => {
  // BUG: la tabla se llama "citas", no "cita".
  const result = await pool.query("DELETE FROM cita WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};
