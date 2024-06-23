import { FastifyRequest, FastifyReply } from 'fastify';
import prismaClient from "../prisma";
import { z } from "zod";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersController {
    async store(request: FastifyRequest, reply: FastifyReply) {
        const userSchema = z.object({
            name: z.string().min(3).max(50),
            email: z.string().email(),
            password: z.string().min(8).max(50)
        });
        try{
            let userData = userSchema.parse(request.body);
            
            const usersRepository = new UsersRepository();
            const user = await usersRepository.createUser(userData);
        
            return reply.send({
              success: true,
              message: "Usuario cadastrado com sucesso",
              data: user
            }).status(200);

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
        //logica de atualizar usuario
    }


    async delete(request: FastifyRequest, reply: FastifyReply) {
        //logica de deletar usuario
    }

}

export { UsersController };