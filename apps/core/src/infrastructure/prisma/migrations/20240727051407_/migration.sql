-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "recipes_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "calories" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cookingTime" INTEGER NOT NULL DEFAULT 0;
