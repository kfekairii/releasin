/*
  Warnings:

  - You are about to drop the column `attributes` on the `ProductType` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "productTypeId" INTEGER;

-- AlterTable
ALTER TABLE "ProductType" DROP COLUMN "attributes";

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
