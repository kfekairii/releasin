import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductTypesController } from './product-types.controller';
import { ProductTypesService } from './product-types.service';

@Module({
  controllers: [ProductTypesController],
  providers: [ProductTypesService],
  imports: [PrismaModule],
})
export class ProductTypesModule {}
