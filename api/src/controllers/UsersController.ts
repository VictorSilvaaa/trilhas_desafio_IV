import { FastifyRequest, FastifyReply } from 'fastify';
import prismaClient from "../prisma";
import { z } from "zod";

class UsersController {
    async store(request: FastifyRequest, reply: FastifyReply) {
        const userSchema = z.object({
            name: z.string().min(3).max(50),
            email: z.string().email(),
            password: z.string().min(8).max(50)
        });
        try{
            const user = userSchema.parse(request.body);
            
            //salva os dados no banco
        
            return user

        } catch (error) {
            const errorJson = JSON.stringify(error)

            //erro de validacao
            if (error instanceof z.ZodError){
                return reply.status(400).send(errorJson)
            }else{
                return reply.status(500).send(errorJson)
            }
        }
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        // Define o schema de validação para os dados de atualização
        const updateUserSchema = z.object({
          id: z.string().uuid(),
          name: z.string().min(3).max(50),
          email: z.string().email(),
          password: z.string().min(8).max(50)
        }).partial(); // Permite atualizações parciais
    
        try {
          const { id, ...updateData } = updateUserSchema.parse(request.body);
    
        
          const existingUser = await prismaClient.user.findUnique({
            where: { id },
          });
    
          if (!existingUser) {
            return reply.status(404).send({ message: 'Usuário não encontrado' });
          }
    
          // atualiza os dados 
          const updatedUser = await prismaClient.user.update({
            where: { id },
            data: updateData,
          });
    
          return reply.status(200).send({ message: 'Usuário atualizado com sucesso', user: updatedUser });
    
        } catch (error: any) {
          const errorJson = JSON.stringify(error);
    
          // erro de validação
          if (error instanceof z.ZodError) {
            return reply.status(400).send(errorJson);
          } else if (error instanceof prismaClient.PrismaClientKnownRequestError && error.code === 'P2025') {
            // erro específico do Prisma
            return reply.status(404).send({ message: 'Usuário não encontrado' });
          } else {
            return reply.status(500).send(errorJson);
          }
        }
      }


    async delete(request: FastifyRequest, reply: FastifyReply) {
        //deletar usuario
    }

}

export { UsersController };