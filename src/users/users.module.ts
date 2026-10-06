import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller.js";
import { UsersService } from "./users.service.js";
import { AuthGuard } from "../guards/auth.guard.js";

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthGuard],
})
export class UsersModule {}
