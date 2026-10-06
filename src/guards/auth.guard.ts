import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service.js";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userIdHeader = request.headers["x-user-id"];

    if (!userIdHeader || Array.isArray(userIdHeader)) {
      throw new UnauthorizedException(
        "لطفاً Header مربوط به x-user-id را ارسال کنید",
      );
    }

    const userId = Number(userIdHeader);
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new UnauthorizedException("شناسه کاربر نامعتبر است");
    }

    try {
      request.user = this.usersService.findOne(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException("کاربری با این شناسه پیدا نشد");
      }
      throw error;
    }

    return true;
  }
}
