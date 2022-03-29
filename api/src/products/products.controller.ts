import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  async create(@Body() body: CreateProductDTO) {
    await this.productsService.create(body);
  }
  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }
}
