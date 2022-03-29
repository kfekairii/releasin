-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_attributeValue_id_fkey" FOREIGN KEY ("attributeValue_id") REFERENCES "AttributeValue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
