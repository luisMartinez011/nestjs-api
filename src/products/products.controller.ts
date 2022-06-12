import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiOperation({ summary: "Create some resource" })
  async create(@Res() response, @Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return response.status(HttpStatus.OK).json({
      product
    })
  }

  @Get()
  async findAll(@Res() response) {
    const product = await this.productsService.findAll();
    return response.status(HttpStatus.OK).json({
      product
    })
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    const product = await this.productsService.findOne(+id);;
    return response.status(HttpStatus.OK).json({
      product
    })
  }

  @Patch(':id')
  async update(@Res() response, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productsService.update(+id, updateProductDto);
    return response.status(HttpStatus.OK).json({
      product
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productsService.delete(id);
    return response.status(HttpStatus.OK).json({
      product
    })
  }
}
