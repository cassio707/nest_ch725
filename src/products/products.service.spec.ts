import { NotFoundException } from "@nestjs/common";
import { ProductsService } from "./products.service.js";

describe("ProductsService", () => {
  it("returns a product from prisma", async () => {
    const product = { id: 1, title: "ماوس", price: 25 };
    const prisma = {
      product: {
        findUnique: vi.fn().mockResolvedValue(product),
      },
    };
    const service = new ProductsService(prisma as never);

    await expect(service.findOne(1)).resolves.toEqual(product);
  });

  it("throws when the product does not exist", async () => {
    const prisma = {
      product: {
        findUnique: vi.fn().mockResolvedValue(null),
      },
    };
    const service = new ProductsService(prisma as never);

    await expect(service.findOne(99)).rejects.toBeInstanceOf(NotFoundException);
  });
});
