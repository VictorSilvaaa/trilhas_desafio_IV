import { FastifyRequest, FastifyReply } from 'fastify';
import prismaClient from "../prisma";
import { z } from "zod";
import { UsersRepository } from "../repositories/UsersRepository";

class AuthController {
    async login(request: FastifyRequest, reply: FastifyReply) {
        const userSchema = z.object({
            email: z.string().email(),
            senha: z.string().min(8).max(50)
        });
        try{
            let {email, senha} = userSchema.parse(request.body);
            
            const usersRepository = new UsersRepository();
            const user = await usersRepository.getUserByEmail(email);
            if(user){
                if(user.senha != senha){
                    return reply.status(401).send({
                        success: false,
                        message: "Autenticação Falhou",
                      });
                }else{
                    return reply.status(200).send({
                        success: false,
                        message: "Usuário foi autenticado com sucesso",
                        data: {
                            user: user
                        }
                    });
                }
            }else{
                return  reply.status(400).send({
                    success: false,
                    message: "Usuario não encontrado",
                  });
            }

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
}

export { AuthController };