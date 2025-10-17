import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DatabaseService } from "src/database/database.service";
import bcrypt from "bcrypt";
import { RegisterUserDto } from "src/auth/dto/register-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return `This action returns all users`;
  }

  async create(user: RegisterUserDto) {
    const hashedPassword: string = await bcrypt.hash(user.password, 10);
    const registeredUser = await this.databaseService.users.create({
      data: {
        name: user.name,
        email: user.email,
        phone_no: user.phone_no,
        password: hashedPassword,
      },
    });

    return registeredUser;
  }

  async findOne(id: number, email: string) {
    const user = await this.databaseService.users.findUnique({
      where: {
        id: id,
        email: email,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.databaseService.users.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.databaseService.users.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: number) {
    const user = await this.databaseService.users.delete({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    return true;
  }
}
