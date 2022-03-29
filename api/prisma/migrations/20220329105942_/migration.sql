/*
  Warnings:

  - You are about to drop the column `productTypeId` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `attribute_id` on the `AttributeValue` table. All the data in the column will be lost.
  - Added the required column `attributeValue_id` to the `Attribute` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attribute" DROP CONSTRAINT "Attribute_productTypeId_fkey";

-- DropForeignKey
ALTER TABLE "AttributeValue" DROP CONSTRAINT "AttributeValue_attribute_id_fkey";

-- DropIndex
DROP INDEX "AttributeValue_attribute_id_key";

-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "productTypeId",
ADD COLUMN     "attributeValue_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AttributeValue" DROP COLUMN "attribute_id";

-- AlterTable
ALTER TABLE "ProductType" ADD COLUMN     "attributes" INTEGER[];
