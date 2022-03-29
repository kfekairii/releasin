import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductAttributeDTO } from './dtos/create-product-attribute.dto';
import { CreateProductTypeDTO } from './dtos/create-product-type.dto';
import { ProductTypesService } from './product-types.service';

@Controller('/product-types')
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  //   ProductType Handlers
  @Post()
  async create(@Body() body: CreateProductTypeDTO) {
    await this.productTypesService.create(body);
  }
  @Get()
  async findAll() {
    return await this.productTypesService.findAll();
  }
  //   ProductType Attribute Handlers

  @Post('/attributes')
  async createAttribute(@Body() body: CreateProductAttributeDTO) {
    await this.productTypesService.createAttribute(body);
  }

  @Get('/attributes')
  async findAllAttributes() {
    return await this.productTypesService.findAllAttributes();
  }
}
