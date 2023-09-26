import { FastifyReply, FastifyRequest } from 'fastify';
import peopleService from '../services/people';
import { z } from 'zod';

const createPeople = async (request: FastifyRequest, reply: FastifyReply) => {
  const validateBody = z.object({
    apelido: z.string().max(32, 'max 32 char'),
    nome: z.string().max(100, 'max 100 char'),
    nascimento: z.coerce.string(),
    stack: z.string().max(32, 'max 32 char').array()
  });

  const { apelido, nome, nascimento, stack } = validateBody.parse(request.body);

  const [response, message] = await peopleService.createPeople({ apelido, nome, nascimento, stack });

  if (!response) return reply.status(422).send({ message: message.detail });

  return reply.status(201).send({ message });
}

const getPeopleById = async (request: FastifyRequest, reply: FastifyReply) => {
  const validateParams = z.object({
    id: z.string().uuid(),
  });

  const { id } = validateParams.parse(request.params);

  const response = await peopleService.getPeopleById(id);

  if (!response) return reply.status(404).send('not found');

  return response;
}

const getPeopleByTerm = async (request: FastifyRequest, reply: FastifyReply) => {
  const query = request.query as { t: string };
  const term = query?.t ?? '';

  if (!term) return reply.status(400).send({ message: 'send "t" query param for search'})

  return peopleService.getPeopleByTerm(term);
}

const countPeople = async () => {
  const [response] = await peopleService.countPeople();

  return {
    count: Number(response.count ?? 0)
  };
}

const peopleController = {
  createPeople,
  getPeopleById,
  getPeopleByTerm,
  countPeople
};

export default peopleController