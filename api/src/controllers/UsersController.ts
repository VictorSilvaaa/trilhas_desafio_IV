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
        //deletar usuario
    }

}

export { UsersController };