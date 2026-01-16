/*
  Warnings:

  - The values [LEITOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DISPONIVEL', 'EMPRESTADO', 'RESERVADO', 'ATRASADO');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ALUNO', 'BIBLIOTECARIO', 'PROFESSOR');
ALTER TABLE "public"."Usuario" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Usuario" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "Usuario" ALTER COLUMN "role" SET DEFAULT 'ALUNO';
COMMIT;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "role" SET DEFAULT 'ALUNO';

-- CreateTable
CREATE TABLE "Exemplar" (
    "id" BIGSERIAL NOT NULL,
    "livro_id" BIGINT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Exemplar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emprestimo" (
    "id" BIGSERIAL NOT NULL,
    "usuario_id" BIGINT NOT NULL,
    "exemplar_id" BIGINT NOT NULL,
    "data_emprestimo" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_devolucao_prevista" TIMESTAMP(6) NOT NULL,
    "data_devolucao_real" TIMESTAMP(6),

    CONSTRAINT "Emprestimo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exemplar" ADD CONSTRAINT "Exemplar_livro_id_fkey" FOREIGN KEY ("livro_id") REFERENCES "Livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_exemplar_id_fkey" FOREIGN KEY ("exemplar_id") REFERENCES "Exemplar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
