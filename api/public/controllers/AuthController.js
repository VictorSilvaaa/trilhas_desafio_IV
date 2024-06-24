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
exports.AuthController = void 0;
const zod_1 = require("zod");
const UsersRepository_1 = require("../repositories/UsersRepository");
class AuthController {
    login(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSchema = zod_1.z.object({
                email: zod_1.z.string().email(),
                senha: zod_1.z.string().min(8).max(50)
            });
            try {
                let { email, senha } = userSchema.parse(request.body);
                const usersRepository = new UsersRepository_1.UsersRepository();
                const user = yield usersRepository.getUserByEmail(email);
                if (user) {
                    if (user.senha != senha) {
                        return reply.status(401).send({
                            success: false,
                            message: "Autenticação Falhou",
                        });
                    }
                    else {
                        return reply.status(200).send({
                            success: false,
                            message: "Usuário foi autenticado com sucesso",
                            data: {
                                user: user
                            }
                        });
                    }
                }
                else {
                    return reply.status(400).send({
                        success: false,
                        message: "Usuario não encontrado",
                    });
                }
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
}
exports.AuthController = AuthController;
