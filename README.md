## Practica de desarrollo web APIS

Desarrollador: 
 - Nombre: Estiven Cano Urrego
 - correo: estivencano99@gmail.com

## Desarrollada con: 

- Bootstrap Vue
- Nuxt.js
- Axios

## Base de datos

# Script base de datos: 

- Crear base de datos 

CREATE DATABASE bookmarks
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

----------------------------------------------------------------------------------
- Crear tabla de marcadores

CREATE TABLE public.marcadores
(
    id bigint NOT NULL DEFAULT nextval('marcadores_id_seq'::regclass),
    nombre character varying COLLATE pg_catalog."default" NOT NULL,
    url character varying COLLATE pg_catalog."default" NOT NULL,
    categoria character varying COLLATE pg_catalog."default",
    descripcion character varying COLLATE pg_catalog."default",
    acciones boolean DEFAULT true,
    CONSTRAINT marcadores_pk PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.marcadores
    OWNER to postgres;

------------------------------------------------------------------------------------

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
