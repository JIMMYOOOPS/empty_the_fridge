/*
  Warnings:

  - You are about to drop the column `steps_to_produce` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "steps_to_produce",
ADD COLUMN     "stepsToProduce" TEXT[];
