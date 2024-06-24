// src/repositories/UsersRepository.js
import { z } from "zod";
import { PrismaClient } from '@prisma/client';

interface Usuario {
  id?: string;
  nome: string;
  //to do: mudar para data_nascimento
  data_nascimento: string;
  username: string;
  genero: string;
  estado_id: number;
  cidade_id: number;
  email: string;
  senha: string;
}
class UsersRepository {

  protected prisma = new PrismaClient();

  async createUser(userData: Usuario) {
    const user = await this.prisma.usuario.create({data:userData});
    
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
    const user = await this.prisma.usuario.findUnique({
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
