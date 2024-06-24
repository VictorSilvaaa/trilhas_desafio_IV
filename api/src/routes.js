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
exports.routes = void 0;
const UsersController_1 = require("./controllers/UsersController");
const AuthController_1 = require("./controllers/AuthController");
const usersController = new UsersController_1.UsersController();
const authController = new AuthController_1.AuthController();
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post("/usuarios", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return usersController.store(request, reply);
        }));
        fastify.post("/login", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return authController.login(request, reply);
        }));
        fastify.get("/", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return reply.status(200).send("Seja bem Vindo. Api desenvolvida pela equipe 2 trilhas");
        }));
        //update
        //delete
    });
}
exports.routes = routes;
