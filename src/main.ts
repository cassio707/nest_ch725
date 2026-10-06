import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule, ObserveInstrument } from "./app.module.js";
import { ValidationPipe } from "@nestjs/common";
import { TransformInterceptor } from "./interceptors/transform.interceptor.js";
import { HttpExceptionFilter } from "./filters/http-exception.filter.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
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
