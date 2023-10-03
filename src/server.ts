import fastify from 'fastify';
import peopleController from './controllers/people';
import { logger } from './helpers/log';
import { API_INSTANCE, ADDRESS, PORT } from './settings';
import { FastifyRequestCreate, FastifyRequestGetById } from './interfaces/fastify';

const app = fastify();

// if (cluster.isPrimary) {
//   const numForks = CLUSTER_WORKERS;

//   for (let i = 0; i < numForks; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker) => {
//     cluster.fork();
//     logger.info(`process ${worker.process.pid} died`);
//   });
// } else {
app.get('/', () => `Oii Rinha 🧡 instância: ${API_INSTANCE}`);
app.post('/pessoas', (request: FastifyRequestCreate, reply) => peopleController.createPeople(request, reply));
app.get('/pessoas', (request, reply) => peopleController.getPeopleByTerm(request, reply));
app.get('/pessoas/:id', (request: FastifyRequestGetById, reply) => peopleController.getPeopleById(request, reply));
app.get('/contagem-pessoas', () => peopleController.countPeople());

app.listen({
  host: ADDRESS,
  port: PORT
}, (err, address) => {
  if (err) {
    logger.info('Server is stoped...', err, { pid: process.pid, port: PORT, address: address })
    process.exit(1)
  }

  logger.info('Server is running...', { pid: process.pid, port: PORT, address: address })
});
// }
