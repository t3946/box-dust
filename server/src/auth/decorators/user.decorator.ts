import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Record<any, any> => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
