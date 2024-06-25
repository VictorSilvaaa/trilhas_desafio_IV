import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  // Ler o arquivo JSON
  const filePath = path.join(__dirname, 'cidades.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  const cidades = JSON.parse(data);

  // Inserir dados no banco
  for (const cidade of cidades) {
    await prisma.cidade.create({
      data: {
        id: parseInt(cidade.id),
        titulo: cidade.titulo,
        estado_id: parseInt(cidade.estado_id),
        iso: cidade.iso,
        slug: cidade.slug,
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
