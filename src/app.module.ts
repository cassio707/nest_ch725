import { Module } from "@nestjs/common";
import { createObserveModule } from "@nestjs/observe";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { PrismaModule } from "./prisma/prisma.module.js";
import { ProductsModule } from "./products/products.module.js";
import { UsersModule } from "./users/users.module.js";

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    UsersModule,
    ObserveModule.forRoot({
      appKey: "YOUR_APP_KEY",
      appSecret: "YOUR_APP_SECRET",
      serviceId: "nest_products",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
