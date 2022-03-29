import { AttributeValueOptions } from '@prisma/client';

export class CreateProductAttributeDTO {
  name: string;
  type: AttributeValueOptions;
  attributeValue: string[] | boolean | Date;
}
