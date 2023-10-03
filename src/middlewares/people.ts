import { FastifyReply } from 'fastify';
import { isValidDateString } from '~/helpers/date';
import { FastifyRequestCreate } from '~/interfaces/fastify';
import { ICreatePeopleModel } from '~/interfaces/people'
import peopleRepository from '~/repositories/people';

const validatePeopleCreation = async (
  request: FastifyRequestCreate,
  reply: FastifyReply
) => {
  const { apelido, nome, nascimento, stack } = request.body as ICreatePeopleModel;

  if (
    typeof apelido !== 'string' || apelido.length > 32
    || typeof nome !== 'string' || nome.length > 100
    || typeof nascimento !== 'string' || !isValidDateString(nascimento)
    || (stack?.every(stack => stack.length > 32 || typeof stack !== 'string') && stack !== null)
  ) {
    return reply.status(400).send();
  }

  if (!nome || !apelido) {
    return reply.status(422).send();
  }

  const hasApelido = await peopleRepository.verifyApelidoExist(apelido);

  if (!!hasApelido) {
    return reply.status(422).send();
  }
}

export const validatePeopleCreationMiddleware = { preHandler: validatePeopleCreation }