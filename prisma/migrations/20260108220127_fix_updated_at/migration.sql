/*
  Warnings:

  - Made the column `atualizado_em` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "atualizado_em" SET NOT NULL;
