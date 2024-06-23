// src/repositories/UsersRepository.js

import { SignPrivateKeyInput } from "crypto";
import { z } from "zod";
import { PrismaClient } from '@prisma/client';

interface User {
  name: string,
  email: string,
  password: string
}
class UsersRepository {

  protected prisma = new PrismaClient();

  async createUser(userData: User) {
    const user = await this.prisma.user.create({data:userData});
    return user;
  }

  async getUserById(userId:number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: `${userId}`,
      },
    });
    return user;
  }

  async getUserByEmail(email:string) {
    const user = await this.prisma.user.findUnique({
      where: { email:email },
    });
    return user;
  }

  async updateUser(id:number, newData:User) {
    const user = await this.prisma.user.update({
      where: { id: `${id}` },
      data: newData,
    });
    return user;
  }

  async deleteUser(id:number) {
    const user = await this.prisma.user.delete({
      where: { id: `${id}` },
    });
    return user;
  }
}

export { UsersRepository };
