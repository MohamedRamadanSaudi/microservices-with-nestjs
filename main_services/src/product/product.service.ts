import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './models/product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productModel.create(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findOne(id: number): Promise<Product> {
    return this.productModel.findOne({ id })
  }

  async update(id: number, updateProductDto: any): Promise<any> {
    return this.productModel.findOneAndUpdate({ id }, updateProductDto);
  }

  async remove(id: number): Promise<void> {
    await this.productModel.deleteOne({ id });
  }
}
