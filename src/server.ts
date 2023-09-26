import fastify from 'fastify';
import peopleController from './controllers/people';
import { env } from './settings';
import { logger } from './helpers/log';

const app = fastify();

app.get('/', () => `Oii Rinha 🧡 instância: ${env.API_INSTANCE}`);
app.post('/pessoas', peopleController.createPeople);
app.get('/pessoas', peopleController.getPeopleByTerm);
app.get('/pessoas/:id', peopleController.getPeopleById);
app.get('/contagem-pessoas', peopleController.countPeople);

app.listen({
  host: env.ADDRESS,
  port: env.PORT
}, (err, address) => {
  if (err) {
    logger.info('Server is stoped...', err)
    process.exit(1)
  }

  logger.info(`address: ${address}`)
  logger.info('Server is running...', env.PORT)
});