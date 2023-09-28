import { FastifyRequest } from 'fastify';
import { ICreatePeopleModel } from './people';

export type FastifyRequestCreate = FastifyRequest<{ Body: ICreatePeopleModel }>;
export type FastifyRequestGetById = FastifyRequest<{ Params: { id: string } }>;