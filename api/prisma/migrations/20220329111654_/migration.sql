/*
  Warnings:

  - You are about to drop the column `attributes` on the `ProductType` table. All the data in the column will be lost.
  - Added the required column `productType_id` to the `Attribute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "productType_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductType" DROP COLUMN "attributes";

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_productType_id_fkey" FOREIGN KEY ("productType_id") REFERENCES "ProductType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
