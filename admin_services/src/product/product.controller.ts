import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
  ) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    this.client.emit('product_created', product);
    return product;
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productService.update(+id, updateProductDto);
    this.client.emit('product_updated', product);
    return product;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productService.remove(+id);
    this.client.emit('product_deleted', id);
    return product;
  }

  @Post(':id/like')
  async likeProduct(
    @Param('id') id: number
  ) {
    const product = await this.productService.findOne(id);
    return await this.productService.update(id,
      {
        likes: product.likes + 1
      }
    );
  }
}
