/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `directions` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `ingredients` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `instructions` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `name` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "directions",
DROP COLUMN "ingredients",
DROP COLUMN "instructions",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL,
ADD COLUMN     "steps_to_produce" TEXT[];

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "recipeId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "processing_method" TEXT,
    "quantity_measurement" TEXT,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("recipeId","ingredientId")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeSkill" (
    "recipeId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "RecipeSkill_pkey" PRIMARY KEY ("recipeId","skillId")
);

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeSkill" ADD CONSTRAINT "RecipeSkill_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeSkill" ADD CONSTRAINT "RecipeSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
