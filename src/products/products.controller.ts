import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { Public } from 'src/auth/decorator/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: "Create some resource" })
  async create(@Res() response, @Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return response.status(HttpStatus.OK).json({
      product
    })
  }

  @Public()
  @Get()
  async findAll(@Res() response) {
    const product = await this.productsService.findAll();
    return response.status(HttpStatus.OK).json({
      product
    })
  }

  @Public()
  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    return response.status(HttpStatus.OK).json({
      product
    })
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Res() response, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productsService.update(+id, updateProductDto);
    return response.status(HttpStatus.OK).json({
      product
    })
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productsService.delete(id);
    return response.status(HttpStatus.OK).json({
      product
    })
  }
}
