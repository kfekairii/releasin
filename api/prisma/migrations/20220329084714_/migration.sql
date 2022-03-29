/*
  Warnings:

  - The values [Name] on the enum `AttributeValueOptions` will be removed. If these variants are still used in the database, this will fail.
  - The `name` column on the `AttributeValue` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttributeValueOptions_new" AS ENUM ('Text', 'Boolean', 'Date', 'Select', 'Multiselect');
ALTER TABLE "Attribute" ALTER COLUMN "type" TYPE "AttributeValueOptions_new" USING ("type"::text::"AttributeValueOptions_new");
ALTER TYPE "AttributeValueOptions" RENAME TO "AttributeValueOptions_old";
ALTER TYPE "AttributeValueOptions_new" RENAME TO "AttributeValueOptions";
DROP TYPE "AttributeValueOptions_old";
COMMIT;

-- AlterTable
ALTER TABLE "AttributeValue" DROP COLUMN "name",
ADD COLUMN     "name" TEXT[];
