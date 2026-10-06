import { Module } from "@nestjs/common";
import { createObserveModule } from "@nestjs/observe";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { PrismaModule } from "./prisma/prisma.module.js";
import { ProductsModule } from "./products/products.module.js";
import { UsersModule } from "./users/users.module.js";
import { AuthModule } from "./auth/auth.module.js";

export const { ObserveModule, ObserveInstrument } = createObserveModule();

const observeAppKey = process.env.NEST_OBSERVE_APP_KEY;
const observeAppSecret = process.env.NEST_OBSERVE_APP_SECRET;

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    AuthModule,
    UsersModule,
    ...(observeAppKey && observeAppSecret
      ? [
          ObserveModule.forRoot({
            appKey: observeAppKey,
            appSecret: observeAppSecret,
            serviceId: "nest_products",
          }),
        ]
      : []),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

