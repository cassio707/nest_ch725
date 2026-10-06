import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ProductsService } from "./products.service.js";
import type { Product } from "./products.service.js";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.findAll();
  }

  @Post()
  createProduct(@Body() dto: CreateProductDto): Product {
    return this.productsService.create(dto);
  }

  @Get(":id")
  getProductById(@Param("id", ParseIntPipe) id: number): Product {
    return this.productsService.findOne(id);
  }

  @Patch(":id")
  updateProduct(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ): Product {
    return this.productsService.update(id, dto);
  }

  @Delete(":id")
  deleteProduct(@Param("id", ParseIntPipe) id: number) {
    this.productsService.delete(id);
  }
}
