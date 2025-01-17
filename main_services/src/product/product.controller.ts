import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { HttpService } from '@nestjs/axios';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private httpService: HttpService
  ) { }

  @Post(':id/like')
  async likeProduct(
    @Param('id') id: number
  ) {
    const product = await this.productService.findOne(id);

    this.httpService.post(`http://localhost:8000/api/product/${id}/like`, {}).subscribe(
      response => {
        console.log(response);
      }
    );

    return await this.productService.update(id,
      {
        likes: product.likes + 1
      }
    );
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @EventPattern('product_created')
  async productCreated(product: CreateProductDto) {
    console.log('Product created', product);
    await this.productService.create({
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes
    });
  }

  @EventPattern('product_updated')
  async productUpdated(product: any) {
    console.log('Product updated', product);
    await this.productService.update(product.id, {
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes
    });
  }

  @EventPattern('product_deleted')
  async productDeleted(id: number) {
    console.log('Product deleted ID: ', id);
    await this.productService.remove(id);
  }

}
