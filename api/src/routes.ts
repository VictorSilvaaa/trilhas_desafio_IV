import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UsersController } from './controllers/UsersController';
import { AuthController } from './controllers/AuthController';
import { EstadoRepository} from './repositories/EstadoRepository';

const usersController = new UsersController();
const authController = new AuthController();
const estadoRepository = new EstadoRepository();

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){
    fastify.post("/usuarios", async (request: FastifyRequest, reply: FastifyReply) => {
        return  usersController.store(request, reply)
    })
    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
        return  authController.login(request, reply)
    })
    fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
        return  reply.status(200).send("Seja bem Vindo. Api desenvolvida pela equipe 2 trilhas, repositorio github: https://github.com/VictorSilvaaa/trilhas_desafio_IV ")
    })

    fastify.get("/estados", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          const estados = await estadoRepository.findAll();
          return reply.status(200).send(estados);
        } catch (error) {
          return reply.status(500).send({ 
            error: 'Erro ao buscar estados' + error
            });
        }
    });

    fastify.get("/estados/:uf/cidades", async (request: FastifyRequest, reply: FastifyReply) => {
        const { uf } = request.params as { uf: string };

        try {
        const estadoRepository = new EstadoRepository();
        const estadoId = await estadoRepository.findIdByUf(uf);

        if (!estadoId) {
            return reply.status(404).send({ error: 'Estado não encontrado' });
        }

        const cidades = await estadoRepository.findCidadesByEstadoId(estadoId);
        return reply.status(200).send(cidades);
        } catch (error) {
        return reply.status(500).send({ error: 'Erro ao buscar cidades' });
        }
    });
    //update
    //delete
}