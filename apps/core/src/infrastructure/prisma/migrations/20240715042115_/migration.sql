/*
  Warnings:

  - Made the column `type` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "type" SET NOT NULL;
