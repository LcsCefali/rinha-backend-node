import { FastifyReply, FastifyRequest } from 'fastify';
import peopleService from '../services/people';
import { z } from 'zod';
import { ICreatePeopleModel } from '~/interfaces/people';

const createPeople = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = request.body as ICreatePeopleModel;

  // const isvalidDate = isValid(new Date(body?.nascimento));
  // if (!isvalidDate) return reply.status(400).send();

  const validateBody = z.object({
    apelido: z.string().max(32),
    nome: z.string().max(100),
    nascimento: z.coerce.date(),
    stack: z.string().max(32).array().optional().nullable()
  });

  const { success } = validateBody.safeParse(body);

  if (!success) return reply.status(400).send();

  const userId = await peopleService.createPeople(body);

  if (!userId) return reply.status(422).send();

  return reply.header('Location', `/pessoas/${userId}`).status(201).send();
}

const getPeopleById = async (request: FastifyRequest, reply: FastifyReply) => {
  const validateParams = z.object({
    id: z.string().uuid(),
  });

  const { id } = validateParams.parse(request.params);

  const response = await peopleService.getPeopleById(id);

  if (!response) return reply.status(404).send();

  return response;
}

const getPeopleByTerm = async (request: FastifyRequest, reply: FastifyReply) => {
  const query = request.query as { t: string };
  const term = query?.t ?? '';

  if (!term) return reply.status(400).send()

  return peopleService.getPeopleByTerm(term);
}

const countPeople = async () => {
  const response = await peopleService.countPeople();

  return Number(response?.count ?? 0);
}

const peopleController = {
  createPeople,
  getPeopleById,
  getPeopleByTerm,
  countPeople
};

export default peopleController