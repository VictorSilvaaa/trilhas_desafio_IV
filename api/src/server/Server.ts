import  express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";

const server = express();

// adicionando middlewares
server.use(bodyParser.json());
server.use(cors());

//server.method('router',function)
server.get('/', (req, res)=>{
    return res.send('Olá, DEV!')
});
server.get('/usuarios');

export { server };