/*
  Warnings:

  - You are about to drop the column `AttributeValue` on the `AssignedAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `AssignedAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `AttributeValue` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `ProductTypeId` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `Type` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `Boolean` on the `AttributeValue` table. All the data in the column will be lost.
  - You are about to drop the column `Date` on the `AttributeValue` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `AttributeValue` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `ProductType` table. All the data in the column will be lost.
  - You are about to drop the column `ProductId` on the `ProductType` table. All the data in the column will be lost.
  - Added the required column `attributeValue_id` to the `AssignedAttribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attributeValue_id` to the `Attribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Attribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Attribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boolean` to the `AttributeValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `AttributeValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `AttributeValue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productType_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ProductType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AssignedAttribute" DROP CONSTRAINT "AssignedAttribute_productId_fkey";

-- DropForeignKey
ALTER TABLE "Attribute" DROP CONSTRAINT "Attribute_ProductTypeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductType" DROP CONSTRAINT "ProductType_ProductId_fkey";

-- DropIndex
DROP INDEX "ProductType_ProductId_key";

-- AlterTable
ALTER TABLE "AssignedAttribute" DROP COLUMN "AttributeValue",
DROP COLUMN "productId",
ADD COLUMN     "attributeValue_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "AttributeValue",
DROP COLUMN "Name",
DROP COLUMN "ProductTypeId",
DROP COLUMN "Type",
ADD COLUMN     "attributeValue_id" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "type" "AttributeValueOptions" NOT NULL;

-- AlterTable
ALTER TABLE "AttributeValue" DROP COLUMN "Boolean",
DROP COLUMN "Date",
DROP COLUMN "Name",
ADD COLUMN     "boolean" BOOLEAN NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "assignedAttributes" INTEGER[],
ADD COLUMN     "productType_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductType" DROP COLUMN "Name",
DROP COLUMN "ProductId",
ADD COLUMN     "attributes" INTEGER[],
ADD COLUMN     "name" TEXT NOT NULL;
