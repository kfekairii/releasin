/*
  Warnings:

  - You are about to drop the column `attributeValue_id` on the `Attribute` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[attribute_id]` on the table `AttributeValue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attribute_id` to the `AttributeValue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attribute" DROP CONSTRAINT "Attribute_attributeValue_id_fkey";

-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "attributeValue_id";

-- AlterTable
ALTER TABLE "AttributeValue" ADD COLUMN     "attribute_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AttributeValue_attribute_id_key" ON "AttributeValue"("attribute_id");

-- AddForeignKey
ALTER TABLE "AttributeValue" ADD CONSTRAINT "AttributeValue_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
