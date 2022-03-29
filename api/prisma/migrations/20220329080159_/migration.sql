/*
  Warnings:

  - You are about to drop the `tab_User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AttributeValueOptions" AS ENUM ('Name', 'Boolean', 'Date');

-- DropTable
DROP TABLE "tab_User";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductType" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ProductId" INTEGER NOT NULL,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Type" "AttributeValueOptions" NOT NULL,
    "AttributeValue" INTEGER NOT NULL,
    "ProductTypeId" INTEGER,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignedAttribute" (
    "id" SERIAL NOT NULL,
    "AttributeValue" INTEGER NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "AssignedAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeValue" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Boolean" BOOLEAN NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttributeValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductType_ProductId_key" ON "ProductType"("ProductId");

-- AddForeignKey
ALTER TABLE "ProductType" ADD CONSTRAINT "ProductType_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_ProductTypeId_fkey" FOREIGN KEY ("ProductTypeId") REFERENCES "ProductType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedAttribute" ADD CONSTRAINT "AssignedAttribute_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
