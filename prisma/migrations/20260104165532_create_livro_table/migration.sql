-- CreateEnum
CREATE TYPE "Role" AS ENUM ('LEITOR', 'BIBLIOTECARIO', 'PROFESSOR');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" BIGSERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "sobrenome" VARCHAR(100),
    "email" VARCHAR(150) NOT NULL,
    "senha" VARCHAR(200) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'LEITOR',
    "criado_em" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Livro" (
    "id" BIGSERIAL NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "autor" VARCHAR(150) NOT NULL,
    "ano_publicacao" INTEGER,
    "genero" VARCHAR(100),
    "isbn" VARCHAR(20) NOT NULL,
    "criado_em" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Livro_isbn_key" ON "Livro"("isbn");
