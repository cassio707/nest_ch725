import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { JwtAuthGuard } from "../guards/jwt-auth.guard.js";
import { User as UserDecorator } from "../decorators/user.decorator.js";
import type { PublicUser } from "./users.models.js";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  getProfile(
    @UserDecorator() currentUser: PublicUser,
    @UserDecorator("username") username: string,
  ) {
    return {
      message: `خوش آمدی ${username}`,
      userData: currentUser,
    };
  }

  @Get()
  getAllUsers(@Query("role") role?: string) {
    return role === undefined
      ? this.usersService.findAll()
      : this.usersService.findByRole(role);
  }

  @Get("role")
  getUsersByRole(@Query("role") role: string) {
    return this.usersService.findByRole(role);
  }

  @Get(":id")
  getUserById(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
