import { pool } from "../config/db.js";

export interface Mascota {
  id: number;
  nombre: string;
  edad: number;
  especie_id: number;
}

export const obtenerMascotas = async (): Promise<Mascota[]> => {
  const result = await pool.query("SELECT * FROM mascotas ORDER BY id");
  return result.rows;
};

export const obtenerMascotaPorId = async (id: number): Promise<Mascota | undefined> => {
  // BUG: la columna se llama "id", no "i".
  const result = await pool.query("SELECT * FROM mascotas WHERE i = $1", [id]);
  return result.rows[0];
};

export const crearMascota = async (data: {
  nombre: string;
  edad: number;
  especie_id: number;
}): Promise<Mascota> => {
  // BUG: falta el "await", asi que "result" es una Promise y no un QueryResult.
  const result = pool.query(
    "INSERT INTO mascotas (nombre, edad, especie_id) VALUES ($1, $2, $3) RETURNING *",
    [data.nombre, data.edad, data.especie_id]
  );
  return result.rows[0];
};

export const actualizarMascota = async (
  id: number,
  data: Partial<{ nombre: string; edad: number; especie_id: number }>
): Promise<Mascota | undefined> => {
  const actual = await obtenerMascotaPorId(id);
  if (!actual) return undefined;

  const nombre = data.nombre ?? actual.nombre;
  const edad = data.edad ?? actual.edad;
  const especie_id = data.especie_id ?? actual.especie_id;

  const result = await pool.query(
    "UPDATE mascotas SET nombre = $1, edad = $2, especie_id = $3 WHERE id = $4 RETURNING *",
    [nombre, edad, especie_id, id]
  );
  return result.rows[0];
};

export const eliminarMascota = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM mascotas WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};
