CREATE TABLE "usuario" (
  "cedula" integer PRIMARY KEY,
  "correo" varchar,
  "nombre" varchar NOT NULL,
  "contrasenia" varchar NOT NULL,
  "id_tipo_usuario" integer NOT NULL,
  "id_escuela" integer
);

CREATE TABLE "tipo_usuario" (
  "id_tipo_usuario" SERIAL PRIMARY KEY,
  "nombre" varchar NOT NULL,
  "descripcion" varchar
);

CREATE TABLE "archivo" (
  "id_archivo" SERIAL PRIMARY KEY,
  "titulo" varchar NOT NULL,
  "descripcion" varchar,
  "fecha_publicacion" date NOT NULL,
  "url_archivo" varchar,
  "estado" varchar NOT NULL,
  "id_tipo_archivo" integer
);

CREATE TABLE "tipo_archivo" (
  "id_tipo_archivo" SERIAL PRIMARY KEY,
  "nombre" varchar NOT NULL,
  "descripcion" varchar,
  "cantidad" integer NOT NULL DEFAULT 0
);

CREATE TABLE "autor" (
  "id_archivo" integer,
  "cedula" integer,
  PRIMARY KEY ("id_archivo", "cedula")
);

CREATE TABLE "nota_archivo" (
  "id_nota_archivo" SERIAL PRIMARY KEY,
  "id_archivo" integer,
  "cedula" integer,
  "contenido" text NOT NULL,
  "fecha" timestamp DEFAULT (now())
);

CREATE TABLE "reunion" (
  "id_reunion" SERIAL PRIMARY KEY,
  "asunto" varchar NOT NULL,
  "descripcion" varchar,
  "fecha_inicio" timestamp NOT NULL,
  "fecha_fin" timestamp NOT NULL,
  "cant_participantes" integer NOT NULL,
  "estado" char NOT NULL
);

CREATE TABLE "participante" (
  "id_reunion" integer,
  "cedula" integer,
  PRIMARY KEY ("id_reunion", "cedula")
);

CREATE TABLE "nota_reunion" (
  "id_nota_reunion" SERIAL PRIMARY KEY,
  "contenido" text NOT NULL,
  "fecha" timestamp DEFAULT (now()),
  "id_reunion" integer,
  "cedula" integer
);

CREATE TABLE "escuela" (
  "id_escuela" SERIAL PRIMARY KEY,
  "nombre" varchar NOT NULL,
  "descripcion" varchar,
  "id_facultad" integer NOT NULL
);

CREATE TABLE "facultad" (
  "id_facultad" SERIAL PRIMARY KEY,
  "nombre" varchar NOT NULL,
  "descripcion" varchar
);

CREATE TABLE "archivo_escuela" (
  "id_archivo" integer,
  "id_escuela" integer,
  PRIMARY KEY ("id_archivo", "id_escuela")
);

ALTER TABLE "usuario" ADD FOREIGN KEY ("id_tipo_usuario") REFERENCES "tipo_usuario" ("id_tipo_usuario") on delete no action 
on update cascade;

ALTER TABLE "usuario" ADD FOREIGN KEY ("id_escuela") REFERENCES "escuela" ("id_escuela") on delete set null on update cascade;

ALTER TABLE "archivo" ADD FOREIGN KEY ("id_tipo_archivo") REFERENCES "tipo_archivo" ("id_tipo_archivo") on delete set null on update cascade;

ALTER TABLE "autor" ADD FOREIGN KEY ("id_archivo") REFERENCES "archivo" ("id_archivo") on update cascade on delete cascade;

ALTER TABLE "autor" ADD FOREIGN KEY ("cedula") REFERENCES "usuario" ("cedula") on update cascade on delete cascade;

ALTER TABLE "nota_archivo" ADD FOREIGN KEY ("id_archivo") REFERENCES "archivo" ("id_archivo") on update cascade on delete cascade;

ALTER TABLE "nota_archivo" ADD FOREIGN KEY ("cedula") REFERENCES "usuario" ("cedula") on update cascade on delete cascade;


ALTER TABLE "participante" ADD FOREIGN KEY ("id_reunion") REFERENCES "reunion" ("id_reunion") on update cascade on delete cascade;


ALTER TABLE "participante" ADD FOREIGN KEY ("cedula") REFERENCES "usuario" ("cedula") on update cascade on delete cascade;


ALTER TABLE "nota_reunion" ADD FOREIGN KEY ("id_reunion") REFERENCES "reunion" ("id_reunion") on update cascade on delete cascade;

ALTER TABLE "nota_reunion" ADD FOREIGN KEY ("cedula") REFERENCES "usuario" ("cedula") on update cascade on delete cascade;

ALTER TABLE "archivo_escuela" ADD FOREIGN KEY ("id_archivo") REFERENCES "archivo" ("id_archivo") on update cascade on delete cascade;

ALTER TABLE "archivo_escuela" ADD FOREIGN KEY ("id_escuela") REFERENCES "escuela" ("id_escuela") on update cascade on delete cascade;

ALTER TABLE "escuela" ADD FOREIGN KEY ("id_facultad") REFERENCES "facultad" ("id_facultad") on delete no action on update cascade;