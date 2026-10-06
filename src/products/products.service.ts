import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";

export type Product = {
  id: number;
  title: string;
  price: number;
};

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, title: "لپ‌تاپ", price: 1500 },
    { id: 2, title: "ماوس", price: 25 },
    { id: 3, title: "کیبورد", price: 75 },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      throw new NotFoundException(`محصولی با شناسه ${id} پیدا نشد`);
    }

    return product;
  }

  create(dto: CreateProductDto): Product {
    const newProduct: Product = {
      id: Date.now(),
      ...dto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, dto: UpdateProductDto): Product {
    const product = this.findOne(id);

    Object.assign(product, dto);

    return product;
  }

  delete(id: number) {
    const index = this.products.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`محصولی با شناسه ${id} پیدا نشد`);
    }

    this.products.splice(index, 1);
    
  }
}
