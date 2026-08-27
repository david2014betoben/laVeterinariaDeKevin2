-- =====================================================
-- La Veterinaria de Kevin - Script de base de datos
-- =====================================================
-- Ejecuta este script completo en tu base de datos de PostgreSQL
-- (por ejemplo con psql, pgAdmin o DBeaver) ANTES de correr la API.
--
-- 1. Crea una base de datos vacia, por ejemplo:
--      CREATE DATABASE la_veterinaria;
-- 2. Conectate a esa base de datos.
-- 3. Corre todo el contenido de este archivo.
-- =====================================================

DROP TABLE IF EXISTS citas;
DROP TABLE IF EXISTS mascotas;
DROP TABLE IF EXISTS duenos;
DROP TABLE IF EXISTS especies;

-- Especies de mascotas (ej: Perro, Gato, Ave)
CREATE TABLE especies (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255)
);

-- Mascotas atendidas en la veterinaria
CREATE TABLE mascotas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INTEGER NOT NULL DEFAULT 0, --bug permite registar edad negativa¿?, creo que en ninguno impide
    especie_id INTEGER REFERENCES especies(id) ON DELETE SET NULL
);

-- Duenos de las mascotas
CREATE TABLE duenos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20)
);

-- Citas agendadas para las mascotas
CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    dueno_id INTEGER NOT NULL REFERENCES duenos(id) ON DELETE CASCADE,
    mascota_id INTEGER NOT NULL REFERENCES mascotas(id) ON DELETE CASCADE,
    motivo VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE
);

-- =====================================================
-- Datos de ejemplo (opcional, pero ayuda a probar la API)
-- =====================================================

INSERT INTO especies (nombre, descripcion) VALUES
    ('Perro', 'Canino domestico'),
    ('Gato', 'Felino domestico'),
    ('Ave', 'Aves de compania como pericos o canarios');

INSERT INTO mascotas (nombre, edad, especie_id) VALUES
    ('Firulais', 3, 1),
    ('Michi', 2, 2),
    ('Piolin', 1, 3);

INSERT INTO duenos (nombre, email, telefono) VALUES
    ('Ana Perez', 'ana.perez@example.com', '8888-1111'),
    ('Luis Gomez', 'luis.gomez@example.com', '8888-2222');

INSERT INTO citas (dueno_id, mascota_id, motivo) VALUES
    (1, 1, 'Vacuna anual'),
    (2, 2, 'Control de peso');
