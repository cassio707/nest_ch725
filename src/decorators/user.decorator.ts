import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { User as UserModel } from "../users/users.models.js";

export const User = createParamDecorator(
  (data: keyof UserModel | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user?: UserModel }>();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
