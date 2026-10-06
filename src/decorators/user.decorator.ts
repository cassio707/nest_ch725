import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { PublicUser } from "../users/users.models.js";

export const User = createParamDecorator(
  (data: keyof PublicUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user?: PublicUser }>();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
