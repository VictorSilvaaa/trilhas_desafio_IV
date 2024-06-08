import  express from 'express';

const server = express();

//server.method('router',function)
server.get('/', (req, res)=>{
    return res.send('Olá, DEV!')
});
server.get('/usuarios');

export { server };