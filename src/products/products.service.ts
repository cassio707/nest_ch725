import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "../generated/prisma/client.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany({
      orderBy: { id: "asc" },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`محصولی با شناسه ${id} پیدا نشد`);
    }

    return product;
  }

  create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        title: dto.title,
        price: dto.price,
      },
    });
  }

  async update(id: number, dto: UpdateProductDto) {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundException(`محصولی با شناسه ${id} پیدا نشد`);
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      await this.prisma.product.delete({
        where: { id },
      });

      return { message: `محصول با شناسه ${id} با موفقیت حذف شد` };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundException(`محصولی با شناسه ${id} پیدا نشد`);
      }
      throw error;
    }
  }
}
