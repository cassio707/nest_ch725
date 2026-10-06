import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { User } from "./users.models.js";

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, username: "john_doe", role: "user" },
    { id: 2, username: "jane", role: "user" },
    { id: 3, username: "admin", role: "admin" },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(dto: CreateUserDto) {
    const newUser: User = {
      id: Date.now(),
      username: dto.username,
      role: dto.role,
    };
    this.users.push(newUser);
    return newUser;
  }

  delete(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const deletedUser = this.users[index];
    this.users.splice(index, 1);
    return {
      message: `User with id ${id} deleted successfully`,
      user: deletedUser,
    };
  }

  findByRole(role: string) {
    return this.users.filter((user) => user.role === role);
  }
}
