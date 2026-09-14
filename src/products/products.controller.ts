import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/users.entity';
import { Product } from './entities';
import { ValidRoles } from 'src/auth/interfaces';



@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth( ValidRoles.admin )
  @ApiResponse({ status: 201, description: 'Product was created', type: Product })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.create(createProductDto, user );
  }

  @Get()
  @ApiResponse({ status: 201, description: 'Products found', type: Product })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  findAll( @Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiResponse({ status: 200, description: 'Product found', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Auth( ValidRoles.admin )
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string,
  @Body() updateProductDto: UpdateProductDto,
  @GetUser() user: User,
  ){
    return this.productsService.update(id, updateProductDto, user);
  }
  
  @Auth( ValidRoles.admin )
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
