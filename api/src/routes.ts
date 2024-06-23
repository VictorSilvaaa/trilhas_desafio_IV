import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UsersController } from './controllers/UsersController';
import { AuthController } from './controllers/AuthController';

const usersController = new UsersController();
const authController = new AuthController();

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){
    fastify.post("/usuarios", async (request: FastifyRequest, reply: FastifyReply) => {
        return  usersController.store(request, reply)
    })
    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
        return  authController.login(request, reply)
    })
    fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
        return  reply.status(200).send("Seja bem Vindo. Api desenvolvida pela equipe 2 trilhas")
    })
    //update
    //delete
}