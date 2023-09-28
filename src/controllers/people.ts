import { FastifyReply, FastifyRequest } from 'fastify';
import peopleService from '../services/people';
import { FastifyRequestCreate, FastifyRequestGetById } from '~/interfaces/fastify';
import { randomUUID } from 'node:crypto';

export class PeopleController {
  async createPeople (request: FastifyRequestCreate, reply: FastifyReply) {
    const id = randomUUID();

    peopleService.createPeople({...request.body, id});
  
    return reply.header('Location', `/pessoas/${id}`).status(201).send();
  }
  
  async getPeopleById (request: FastifyRequestGetById, reply: FastifyReply) {    
    const response = await peopleService.getPeopleById(request.params.id);
  
    if (!response) return reply.status(404).send();
  
    return response;
  }
  
  async getPeopleByTerm (request: FastifyRequest, reply: FastifyReply) {
    const query = request.query as { t: string };
    const term = query?.t ?? '';
  
    if (!term) return reply.status(400).send()
  
    return peopleService.getPeopleByTerm(term);
  }
  
  async countPeople () {
    const count = await peopleService.countPeople();
  
    return count ?? 0;
  }
}

const peopleController = new PeopleController();
export default peopleController