import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { ProductTypesModule } from './product-types/product-types.module';

@Module({
  imports: [PrismaModule, ProductsModule, ProductTypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
