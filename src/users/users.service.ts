import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Prisma } from "../generated/prisma/client.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateUserDto } from "./dto/create-user.dto.js";

const publicUserSelect = {
  id: true,
  email: true,
  username: true,
  role: true,
  createdAt: true,
} as const;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: publicUserSelect,
      orderBy: { id: "asc" },
    });
  }

  findByRole(role: string) {
    return this.prisma.user.findMany({
      where: { role },
      select: publicUserSelect,
      orderBy: { id: "asc" },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: publicUserSelect,
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
          email: dto.email,
          username: dto.username,
          password: await bcrypt.hash(dto.password, 10),
          role: dto.role,
        },
        select: publicUserSelect,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException("این ایمیل یا نام کاربری قبلاً ثبت شده است");
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
        select: publicUserSelect,
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
