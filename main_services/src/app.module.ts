import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { ProductModule } from './product/product.module';
config();


@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI, {
    autoCreate: true
  }),
    ProductModule,
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
