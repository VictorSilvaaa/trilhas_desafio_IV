import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UsersController } from './controllers/UsersController';

const usersController = new UsersController();

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){
    fastify.post("/usuarios", async (request: FastifyRequest, reply: FastifyReply) => {
        return  usersController.store(request, reply)
    })
    //update
    //delete
}