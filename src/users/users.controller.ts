import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service.js";
import type { User } from "./users.models.js";
import { CreateUserDto } from "./dto/create-user.dto.js";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(@Query("role") role?: string): User[] {
    return role === undefined
      ? this.usersService.findAll()
      : this.usersService.findByRole(role);
  }

  @Get(":id")
  getUserById(@Param("id", ParseIntPipe) id: number): User {
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post()
  createUser(@Body() dto: CreateUserDto): User {
    return this.usersService.create(dto);
  }

  @Delete(":id")
  deleteUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Get("role")
  getUsersByRole(@Query("role") role: string) {
    return this.usersService.findByRole(role);
  }
}
