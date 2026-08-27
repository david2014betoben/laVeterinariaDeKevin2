// Documento OpenAPI escrito a mano (sin swagger-jsdoc) para mantener
// las dependencias al minimo. Se sirve con swagger-ui-express en /api-docs.

export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "La Veterinaria de Kevin - API",
    version: "1.0.0",
    description:
      "API sencilla con CRUD para especies, mascotas, duenos y citas.",
  },
  servers: [{ url: "/api" }],
  tags: [
    { name: "Especies" },
    { name: "Mascotas" },
    { name: "Duenos" },
    { name: "Citas" },
  ],
  components: {
    schemas: {
      Especie: {
        type: "object",
        properties: {
          id: { type: "integer", readOnly: true },
          nombre: { type: "string" },
          descripcion: { type: "string" },
        },
        required: ["nombre"],
      },
      Mascota: {
        type: "object",
        properties: {
          id: { type: "integer", readOnly: true },
          nombre: { type: "string" },
          edad: { type: "integer" },
          especie_id: { type: "integer" },
        },
        required: ["nombre", "especie_id"],
      },
      Dueno: {
        type: "object",
        properties: {
          id: { type: "integer", readOnly: true },
          nombre: { type: "string" },
          email: { type: "string", format: "email" },
          telefono: { type: "string" },
        },
        required: ["nombre", "email"],
      },
      Cita: {
        type: "object",
        properties: {
          id: { type: "integer", readOnly: true },
          dueno_id: { type: "integer" },
          mascota_id: { type: "integer" },
          motivo: { type: "string" },
          fecha: { type: "string", format: "date", readOnly: true },
        },
        required: ["dueno_id", "mascota_id", "motivo"],
      },
      Error: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      },
    },
  },
  paths: {
    "/especies": {
      get: {
        tags: ["Especies"],
        summary: "Listar todas las especies",
        responses: {
          200: {
            description: "Lista de especies",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Especie" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Especies"],
        summary: "Crear una especie",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Especie" },
            },
          },
        },
        responses: {
          201: { description: "Especie creada" },
          400: { description: "Datos invalidos" },
        },
      },
    },
    "/especies/{id}": {
      get: {
        tags: ["Especies"],
        summary: "Obtener una especie por id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "Especie encontrada" },
          404: { description: "No encontrada" },
        },
      },
      put: {
        tags: ["Especies"],
        summary: "Actualizar una especie",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Especie" },
            },
          },
        },
        responses: {
          200: { description: "Especie actualizada" },
          404: { description: "No encontrada" },
        },
      },
      delete: {
        tags: ["Especies"],
        summary: "Eliminar una especie",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "Especie eliminada" },
          404: { description: "No encontrada" },
        },
      },
    },
    "/mascotas": {
      get: {
        tags: ["Mascotas"],
        summary: "Listar todas las mascotas",
        responses: { 200: { description: "Lista de mascotas" } },
      },
      post: {
        tags: ["Mascotas"],
        summary: "Crear una mascota",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Mascota" },
            },
          },
        },
        responses: { 201: { description: "Mascota creada" }, 400: { description: "Datos invalidos" } },
      },
    },
    "/mascotas/{id}": {
      get: {
        tags: ["Mascotas"],
        summary: "Obtener una mascota por id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Mascota encontrada" }, 404: { description: "No encontrada" } },
      },
      put: {
        tags: ["Mascotas"],
        summary: "Actualizar una mascota",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Mascota" },
            },
          },
        },
        responses: { 200: { description: "Mascota actualizada" }, 404: { description: "No encontrada" } },
      },
      delete: {
        tags: ["Mascotas"],
        summary: "Eliminar una mascota",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Mascota eliminada" }, 404: { description: "No encontrada" } },
      },
    },
    "/duenos": {
      get: {
        tags: ["Duenos"],
        summary: "Listar todos los duenos",
        responses: { 200: { description: "Lista de duenos" } },
      },
      post: {
        tags: ["Duenos"],
        summary: "Crear un dueno",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Dueno" },
            },
          },
        },
        responses: { 201: { description: "Dueno creado" }, 400: { description: "Datos invalidos" } },
      },
    },
    "/duenos/{id}": {
      get: {
        tags: ["Duenos"],
        summary: "Obtener un dueno por id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Dueno encontrado" }, 404: { description: "No encontrado" } },
      },
      put: {
        tags: ["Duenos"],
        summary: "Actualizar un dueno",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Dueno" },
            },
          },
        },
        responses: { 200: { description: "Dueno actualizado" }, 404: { description: "No encontrado" } },
      },
      delete: {
        tags: ["Duenos"],
        summary: "Eliminar un dueno",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Dueno eliminado" }, 404: { description: "No encontrado" } },
      },
    },
    "/citas": {
      get: {
        tags: ["Citas"],
        summary: "Listar todas las citas",
        responses: { 200: { description: "Lista de citas" } },
      },
      post: {
        tags: ["Citas"],
        summary: "Crear una cita",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cita" },
            },
          },
        },
        responses: { 201: { description: "Cita creada" }, 400: { description: "Datos invalidos" } },
      },
    },
    "/citas/dueno/{duenoId}": {
      get: {
        tags: ["Citas"],
        summary: "Listar las citas de un dueno",
        parameters: [{ name: "duenoId", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Citas del dueno" } },
      },
    },
    "/citas/{id}": {
      get: {
        tags: ["Citas"],
        summary: "Obtener una cita por id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Cita encontrada" }, 404: { description: "No encontrada" } },
      },
      put: {
        tags: ["Citas"],
        summary: "Actualizar una cita",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cita" },
            },
          },
        },
        responses: { 200: { description: "Cita actualizada" }, 404: { description: "No encontrada" } },
      },
      delete: {
        tags: ["Citas"],
        summary: "Eliminar una cita",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Cita eliminada" }, 404: { description: "No encontrada" } },
      },
    },
  },
};
