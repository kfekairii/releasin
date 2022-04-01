import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dtos/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(att: CreateProductDTO) {
    try {
      await this.prismaService.product.create({
        data: {
          name: att.name,
          productType: { connect: { id: att.productType_id } },
          assignedAttributes: {
            createMany: {
              data: att.assignedAttributes.map((op) => {
                return { attributeValueId: op };
              }),
              skipDuplicates: true,
            },
          },
        },
      });

      //   Create the attribute value
      // Promise.all(
      //   att.assignedAttributes.map(async (op) => {
      //     await this.prismaService.assignedAttribute.create({
      //       data: {
      //         attributeValue: {
      //           connect: { id: op },
      //         },
      //         product_id: product.id,
      //       },
      //     });
      //   }),
      // );
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if ((e.code = 'p2002')) {
          throw new BadRequestException('Already exists');
        }
      } else if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException(e.message);
    }
  }

  async findAll() {
    return await this.prismaService.product.findMany({
      include: {
        productType: { include: { attributes: true } },
        assignedAttributes: { include: { attributeValue: true } },
      },
    });
  }
}
