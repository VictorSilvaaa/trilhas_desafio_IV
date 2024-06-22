// src/repositories/UsersRepository.js

import { SignPrivateKeyInput } from "crypto";

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class UsersRepository {
  async createUser(username:string, email:string, password:string) {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return user;
  }

  async getUserById(id:number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async getUserByEmail(email:string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async updateUser(id:number, newData:object) {
    const user = await prisma.user.update({
      where: { id },
      data: newData,
    });
    return user;
  }

  async deleteUser(id:number) {
    const user = await prisma.user.delete({
      where: { id },
    });
    return user;
  }
}

module.exports = new UsersRepository();
