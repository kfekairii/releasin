import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AttributeValueOptions } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductAttributeDTO } from './dtos/create-product-attribute.dto';
import { CreateProductTypeDTO } from './dtos/create-product-type.dto';

@Injectable()
export class ProductTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(att: CreateProductTypeDTO) {
    await this.prismaService.productType.create({
      data: {
        name: att.name,
        attributes: { connect: [...att.attributes.map((op) => ({ id: op }))] },
      },
    });
  }

  async findAll() {
    return await this.prismaService.productType.findMany({
      include: { attributes: true },
    });
  }

  // ===================== Attribute CRUD============================
  async createAttribute(att: CreateProductAttributeDTO) {
    try {
      //   Create the attribute value
      const attributeValue = await this.prismaService.attributeValue.create({
        data: { ...this.assignPropreDataType(att.type, att.attributeValue) },
      });
      await this.prismaService.attribute.create({
        data: {
          name: att.name,
          type: att.type,
          attributeValue_id: attributeValue.id,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if ((e.code = 'p2002')) {
          throw new BadRequestException('Name already exists');
        }
      } else if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException('Oops, An error accured..');
    }
  }

  async findAllAttributes() {
    return await this.prismaService.attribute.findMany({
      include: { attributeValue: true },
    });
  }

  // Helper Function
  private assignPropreDataType = (
    dataType: AttributeValueOptions,
    value: any,
  ) => {
    switch (dataType) {
      case 'Text':
        return { name: [value] };
      case 'Multiselect':
      case 'Select':
        return { name: value };
      case 'Boolean':
        return { boolean: value };
      case 'Date':
        return { date: value };

      default:
        throw new BadRequestException('Unsepported Attribute type');
    }
  };
}
