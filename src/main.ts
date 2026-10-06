import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule, ObserveInstrument } from "./app.module.js";
import { ValidationPipe } from "@nestjs/common";
import { TransformInterceptor } from "./interceptors/transform.interceptor.js";
import { HttpExceptionFilter } from "./filters/http-exception.filter.js";

async function bootstrap() {
  const observeEnabled = Boolean(
    process.env.NEST_OBSERVE_APP_KEY && process.env.NEST_OBSERVE_APP_SECRET,
  );
  const app = await NestFactory.create(
    AppModule,
    observeEnabled ? { instrument: ObserveInstrument } : undefined,
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
