-- DropForeignKey
ALTER TABLE "Attribute" DROP CONSTRAINT "Attribute_productType_id_fkey";

-- AlterTable
ALTER TABLE "Attribute" ALTER COLUMN "productType_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_productType_id_fkey" FOREIGN KEY ("productType_id") REFERENCES "ProductType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
