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
        //atualizar dados do usuario
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const deleteSchema = z.object({
            id: z.string().uuid(),
        });

        try {
            const { id } = deleteSchema.parse(request.params);

            const deletedUser = await prismaClient.user.delete({
                where: { id },
            });

            return reply.status(200).send({ message: 'Usuário deletado com sucesso', user: deletedUser });

        } catch (error: any) {
            const errorJson = JSON.stringify(error);

            // Erro de validação
            if (error instanceof z.ZodError) {
                return reply.status(400).send(errorJson);
            } else if (error.code === 'P2025') {
                // Erro específico do prisma p quando um registro não for encontrado
                return reply.status(404).send({ message: 'Usuário não encontrado' });
            } else {
                return reply.status(500).send(errorJson);
            }
        }
    }
}

export { UsersController };