/*
  Warnings:

  - A unique constraint covering the columns `[codigo_tombo]` on the table `Exemplar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo_tombo` to the `Exemplar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exemplar" ADD COLUMN     "codigo_tombo" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Exemplar_codigo_tombo_key" ON "Exemplar"("codigo_tombo");
