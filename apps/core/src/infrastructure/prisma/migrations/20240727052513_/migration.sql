/*
  Warnings:

  - You are about to drop the column `recipes_count` on the `Ingredient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "recipes_count",
ADD COLUMN     "recipesCount" INTEGER NOT NULL DEFAULT 1;
