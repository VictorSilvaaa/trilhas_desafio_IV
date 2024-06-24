"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const zod_1 = require("zod");
const UsersRepository_1 = require("../repositories/UsersRepository");
class UsersController {
    store(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSchema = zod_1.z.object({
                nome: zod_1.z.string().min(3).max(50),
                email: zod_1.z.string().email(),
                username: zod_1.z.string().min(3).max(50),
                data_nascimento: zod_1.z.string(),
                genero: zod_1.z.string().max(1),
                estado: zod_1.z.string(),
                cidade: zod_1.z.string(),
                senha: zod_1.z.string().min(8).max(50)
            });
            try {
                let userData = userSchema.parse(request.body);
                const usersRepository = new UsersRepository_1.UsersRepository();
                const user = yield usersRepository.createUser(userData);
                return reply.send({
                    success: true,
                    message: "Usuario cadastrado com sucesso",
                    data: user
                }).status(200);
            }
            catch (error) {
                const errorJson = JSON.stringify(error);
                //erro de validacao
                if (error instanceof zod_1.z.ZodError) {
                    return reply.status(400).send(errorJson);
                }
                else {
                    return reply.status(500).send(errorJson);
                }
            }
        });
    }
    update(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            //logica de atualizar usuario
        });
    }
    delete(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            //logica de deletar usuario
        });
    }
}
exports.UsersController = UsersController;
