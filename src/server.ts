import fastify from 'fastify';
import { logger } from './helpers/log';
import cluster from 'cluster';
import peopleController from './controllers/people';
import { validatePeopleCreationMiddleware } from './middlewares/people';
import { API_INSTANCE, CLUSTER_WORKERS, ADDRESS, PORT } from './settings';

if (cluster.isPrimary) {
  const numForks = CLUSTER_WORKERS;

  logger.info(`Primary ${process.pid} is running`);

  for (let i = 0; i < numForks; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    // cluster.fork();
    logger.info(`Worker ${worker.process.pid} died: code ${code} signal ${signal}`);
  });
} else {
  const app = fastify();

  app.get('/', () => `Oii Rinha 🧡 instância: ${API_INSTANCE}`);
  app.post('/pessoas', validatePeopleCreationMiddleware, peopleController.createPeople);
  app.get('/pessoas', peopleController.getPeopleByTerm);
  app.get('/pessoas/:id', peopleController.getPeopleById);
  app.get('/contagem-pessoas', peopleController.countPeople);

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
}
