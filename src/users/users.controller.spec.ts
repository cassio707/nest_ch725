import { UsersController } from "./users.controller.js";
import type { User } from "./users.models.js";
import { UsersService } from "./users.service.js";

describe("UsersController", () => {
  const users: User[] = [
    { id: 1, username: "john_doe", role: "user" },
    { id: 3, username: "admin", role: "admin" },
  ];
  const usersService = {
    findAll: vi.fn(() => users),
    findByRole: vi.fn((role: string) => users.filter((user) => user.role === role)),
  };
  const controller = new UsersController(usersService as unknown as UsersService);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("filters users by the role query parameter", () => {
    expect(controller.getAllUsers("admin")).toEqual([users[1]]);
    expect(usersService.findByRole).toHaveBeenCalledWith("admin");
  });

  it("returns all users when no role is provided", () => {
    expect(controller.getAllUsers()).toEqual(users);
    expect(usersService.findAll).toHaveBeenCalledOnce();
  });
});