import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class EstadoRepository {
  async findAll() {
    return prisma.estado.findMany();
  }

  async findById(id: number) {
    return prisma.estado.findUnique({
      where: { id },
    });
  }

  async findCidadesByEstadoId(estado_id: number) {
    return prisma.cidade.findMany({
      where: { estado_id },
    });
  }

  async create(data: any) {
    return prisma.estado.create({
      data,
    });
  }

  async update(id: number, data: any) {
    return prisma.estado.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.estado.delete({
      where: { id },
    });
  }

  async findIdByUf(uf: string) {
    uf = uf.toUpperCase();
    const estado = await prisma.estado.findUnique({
      where: { uf },
      select: { id: true }
    });
    return estado ? estado.id : null;
  }
}

export { EstadoRepository };
