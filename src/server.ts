import fastify from 'fastify';
import peopleController from './controllers/people';
import { env } from './settings';
import { logger } from './helpers/log';
import cluster from 'node:cluster';

const app = fastify();

app.get('/', () => `Oii Rinha 🧡 instância: ${env.API_INSTANCE}`);
app.post('/pessoas', peopleController.createPeople);
app.get('/pessoas', peopleController.getPeopleByTerm);
app.get('/pessoas/:id', peopleController.getPeopleById);
app.get('/contagem-pessoas', peopleController.countPeople);

if (cluster.isPrimary) {
  const numForks = env.CLUSTER_WORKERS;

  logger.info(`Primary ${process.pid} is running`);

  for (let i = 0; i < numForks; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
      logger.info(`Worker ${worker.process.pid} died: code ${code} signal ${signal}`);
  });
} else {
  app.listen({
    host: env.ADDRESS,
    port: env.PORT
  }, (err, address) => {
    if (err) {
      logger.info('Server is stoped...', err, { pid: process.pid, port: env.PORT, address: address })
      process.exit(1)
    }
  
    logger.info('Server is running...', { pid: process.pid, port: env.PORT, address: address })
  });
}
