/*
  Warnings:

  - You are about to drop the column `productTypeId` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `attribute_id` on the `ProductType` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attribute" DROP CONSTRAINT "Attribute_productTypeId_fkey";

-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "productTypeId";

-- AlterTable
ALTER TABLE "ProductType" DROP COLUMN "attribute_id";

-- CreateTable
CREATE TABLE "_AttributeToProductType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AttributeToProductType_AB_unique" ON "_AttributeToProductType"("A", "B");

-- CreateIndex
CREATE INDEX "_AttributeToProductType_B_index" ON "_AttributeToProductType"("B");

-- AddForeignKey
ALTER TABLE "_AttributeToProductType" ADD FOREIGN KEY ("A") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeToProductType" ADD FOREIGN KEY ("B") REFERENCES "ProductType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
