/*
  Warnings:

  - Made the column `atualizado_em` on table `Livro` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Livro" ALTER COLUMN "atualizado_em" SET NOT NULL,
ALTER COLUMN "atualizado_em" DROP DEFAULT;
