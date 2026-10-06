import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { UsersController } from "./users.controller.js";
import { UsersService } from "./users.service.js";
import { JwtAuthGuard } from "../guards/jwt-auth.guard.js";

const usersServiceMock = {
  findAll: vi.fn(),
  findByRole: vi.fn(),
  findOne: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

describe("UsersController", () => {
  let controller: UsersController;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get(UsersController);
  });

  it("returns all users", async () => {
    const users = [{ id: 1, username: "jane", role: "user" }];
    usersServiceMock.findAll.mockResolvedValue(users);

    await expect(controller.getAllUsers()).resolves.toEqual(users);
    expect(usersServiceMock.findAll).toHaveBeenCalled();
  });

  it("filters users by role query", async () => {
    const admins = [{ id: 3, username: "admin", role: "admin" }];
    usersServiceMock.findByRole.mockResolvedValue(admins);

    await expect(controller.getAllUsers("admin")).resolves.toEqual(admins);
    expect(usersServiceMock.findByRole).toHaveBeenCalledWith("admin");
  });

  it("returns a user by id", async () => {
    const user = { id: 1, username: "jane", role: "user" };
    usersServiceMock.findOne.mockResolvedValue(user);

    await expect(controller.getUserById(1)).resolves.toEqual(user);
  });

  it("creates a user", async () => {
    const dto = {
      email: "new@example.com",
      username: "new_user",
      password: "secret1",
      role: "user" as const,
    };
    const created = { id: 4, ...dto };
    usersServiceMock.create.mockResolvedValue(created);

    await expect(controller.createUser(dto)).resolves.toEqual(created);
  });
});

describe("UsersService", () => {
  it("throws when the user does not exist", async () => {
    const prisma = {
      user: {
        findUnique: vi.fn().mockResolvedValue(null),
      },
    };
    const service = new UsersService(prisma as never);

    await expect(service.findOne(99)).rejects.toBeInstanceOf(NotFoundException);
  });
});
