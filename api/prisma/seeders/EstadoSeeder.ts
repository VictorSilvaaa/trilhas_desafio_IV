import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  // Ler o arquivo JSON
  const filePath = path.join(__dirname, 'estados.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  const estados = JSON.parse(data);

  // Inserir dados no banco
  for (const estado of estados) {
    await prisma.estado.create({
      data: {
        id: parseInt(estado.id),
        titulo: estado.titulo,
        uf: estado.uf,
        iso: estado.iso,
        slug: estado.slug,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
