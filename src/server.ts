import fastify from 'fastify';
import peopleController from './controllers/people';
import { env } from './settings';
import { logger } from './helpers/log';

const app = fastify();

app.post('/pessoas', peopleController.createPeople);
app.get('/pessoas', peopleController.getPeopleByTerm);
app.get('/pessoas/:id', peopleController.getPeopleById);
app.get('/contagem-pessoas', peopleController.countPeople);

app.listen({
  port: env.PORT
})
.then(() => logger.info('Server is running...'))
.catch(() => logger.info('Server is stoped...'))