import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "../generated/prisma/client.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateUserDto } from "./dto/create-user.dto.js";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      orderBy: { id: "asc" },
    });
  }

  findByRole(role: string) {
    return this.prisma.user.findMany({
      where: { role },
      orderBy: { id: "asc" },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`کاربری با شناسه ${id} یافت نشد`);
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          username: dto.username,
          role: dto.role,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException("این نام کاربری قبلاً ثبت شده است");
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });

      return {
        message: `User with id ${id} deleted successfully`,
        user,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundException(`کاربری با شناسه ${id} یافت نشد`);
      }
      throw error;
    }
  }
}
