-- CreateTable
CREATE TABLE "Usuario" (
    "_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "estado_id" INTEGER NOT NULL,
    "cidade_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "iso" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidade" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "iso" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "estado_id" INTEGER NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_uf_key" ON "Estado"("uf");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_iso_key" ON "Estado"("iso");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_slug_key" ON "Estado"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Cidade_iso_key" ON "Cidade"("iso");

-- CreateIndex
CREATE UNIQUE INDEX "Cidade_slug_key" ON "Cidade"("slug");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "Cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
